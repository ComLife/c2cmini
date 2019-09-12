import Taro, { Component } from '@tarojs/taro';
import { Button, Input, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { createSelector } from 'reselect';
import './recharge-fund-pwd.scss';
import HeaderTitle from '../../../components/header/header';
// import mapDispatchToProps from './map-dispatch-to-props';
import { baseService } from '../../../services';
import { ERROR_CODE } from '../../../const/enum-set';
// import { ERROR_CODE } from '../../../const/enum-set';

// type PageDispatchProps = {
//   onBaseAuthsRequest: any;
//   loginUser: any;
// };

// type IProps = PageDispatchProps;
//
// interface RechargeFundPwd {
//   props: IProps;
// }

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.loginUser /*(state: Record<string, any>) => state.baseAuthData*/],
  (loginUser /*baseAuthData*/) => {
    return {
      loginUser: loginUser,
      // baseAuthData: baseAuthData,
    };
  },
);

// @ts-ignore
@connect(
  mapStateToProps,
  // mapDispatchToProps,
  null,
)
class RechargeFundPwd extends Component<any, any> {
  private timer: any;

  constructor(props) {
    super(props);
    this.state = {
      phone: '$1******$2',
      waitTime: 0,
      code: '',
      isGoogleOpen: false,
      password: '',
      nextPassword: '',
    };
  }

  //获取手机号=
  getPhone = async () => {
    const userId = this.props.loginUser && this.props.loginUser.uid ? this.props.loginUser.uid : '';
    // eslint-disable-next-line camelcase
    await baseService.baseAuths({ user_id: userId }).then((result: any) => {
      // console.log('@@@@@@@@@@@=>', result);
      if (result.code === ERROR_CODE.SUCCESS) {
        this.setState({ phone: result.data.phone });
      } else {
        Taro.showToast({
          title: result.msg,
          icon: 'none',
          duration: 3000,
        });
      }
    });
  };

  componentDidMount() {
    this.getPhone().then();
  }

  // componentDidShow = async ()=> {
  //   const user_id = this.props.loginUser && this.props.loginUser.uid ? this.props.loginUser.uid : '';
  //   console.log('##########=>', this.props);
  //   await baseService.baseAuths({}).then(()=>{
  //
  //   });
  //   this.props.onBaseAuthsRequest({ user_id }).then(res => {
  //     console.log('@@@@@@@@@@@=>', res);
  //     if (res.payload.code == 1) {
  //       this.setState({ phone: res.payload.data.phone });
  //     } else {
  //       Taro.showToast({
  //         title: res.payload.msg,
  //         icon: 'none',
  //         duration: 3000,
  //       });
  //     }
  //   });
  // }

  handleChange(key, value) {
    this.setState({
      [key]: value.detail.value,
    });
  }

  handlePwdChange = e => {
    // console.log('000000000000000', e);
    this.setState({ password: e.detail.value });
  };

  //提交
  handleSubmit = async () => {
    const { password, nextPassword, code } = this.state;
    if (password === nextPassword) {
      // console.log('44444444444444=>');
      const userId = this.props.loginUser && this.props.loginUser.uid ? this.props.loginUser.uid : '';
      await baseService
        // eslint-disable-next-line camelcase
        .TradepwdReset({ password: nextPassword, user_id: userId, auth_type: 1, rand_code: code })
        .then((result: any) => {
          // console.log('22222222222=>', result);
          if (result.code === ERROR_CODE.SUCCESS) {
            Taro.showToast({
              title: '设置成功',
              icon: 'none',
              duration: 3000,
            });
          } else {
            Taro.showToast({
              title: result.msg,
              icon: 'none',
              duration: 3000,
            });
          }
        });
    } else {
      Taro.navigateBack;
    }
  };

  // 获取验证码
  onGetCodePress = async () => {
    Taro.showLoading({ title: '发送中...' });
    const userId = this.props.loginUser && this.props.loginUser.uid ? this.props.loginUser.uid : '';
    // eslint-disable-next-line camelcase
    await baseService.getTradepwdCode({ user_id: userId, auth_type: 1 }).then((result: any) => {
      // console.log('1111111111', result);
      if (result.code === ERROR_CODE.SUCCESS) {
        Taro.hideLoading();
        Taro.showToast({ title: '验证码发送成功，请注意查收', icon: 'none' });
        this.setState({ waitTime: 60 });
        this.codeTimer();
      } else {
        Taro.hideLoading();
        Taro.showToast({ title: result.msg, icon: 'none' });
      }
    });
  };

  //倒计时
  codeTimer = () => {
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { waitTime } = this.state;
      this.setState({ waitTime: waitTime - 1 }, () => {
        if (this.state.waitTime <= 0) {
          clearInterval(this.timer);
        }
      });
    }, 1000);
  };

  render() {
    const { phone, waitTime, isGoogleOpen, code, password, nextPassword } = this.state;
    const reg = /^(\w{3})\w+(\w{2})/;
    return (
      <View>
        <HeaderTitle title='重置资金密码' />
        <View className='dividing-line' />
        <View className='recharge-pwd-tips'>
          <Text className='recharge-pwd-tips-tv'>
            点击获取验证码按钮,输入由{isGoogleOpen ? '谷歌验证器中生成的6位谷歌' : phone.replace(reg, '$1******$2') + '收到的'}
            验证码，完成身份验证
          </Text>
        </View>

        <View className='input-item'>
          <Input
            className='input-code'
            type='text'
            value={code}
            placeholder={isGoogleOpen ? '请输入谷歌验证码' : '请输入短信验证码'}
            onInput={this.handleChange.bind(this, 'code')}
          ></Input>

          {isGoogleOpen ? (
            <View></View>
          ) : (
            <View>
              {waitTime <= 0 ? (
                <Text className='get_verifycode' onClick={phone !== '$1******$2' ? this.onGetCodePress : () => {}}>
                  获取验证码
                </Text>
              ) : (
                <Text className='get_verifycode'>{`${waitTime}s`}</Text>
              )}
            </View>
          )}
        </View>

        <View className='input-item'>
          <Input
            className='input-fund-code'
            type='number'
            placeholder='请输入6位数字资金密码'
            maxLength={6}
            value={password}
            // onInput={this.handleChange.bind(this, 'password')}
            onInput={this.handlePwdChange.bind(this)}
          ></Input>
        </View>

        <View className='input-item'>
          <Input
            className='input-fund-code-again'
            type='number'
            placeholder='请输入6位数字资金密码'
            maxLength={6}
            value={nextPassword}
            onInput={this.handleChange.bind(this, 'nextPassword')}
          ></Input>
        </View>

        <View className='import-tips-parent'>
          <Text className='import-tips'>提示：重置资金密码后24小时内禁止提币</Text>
        </View>

        <View className='submit-bt-parent'>
          <Button className='submit-bt' onClick={this.handleSubmit}>
            提交
          </Button>
        </View>
      </View>
    );
  }
}

export default RechargeFundPwd;
