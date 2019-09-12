import Taro, { Component } from '@tarojs/taro';
import { Button, Image, Input, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import classNames from 'classnames';
import ImageSet from '../../../const/image-set';
import './register.scss';
import Header from '../../../components/header/header';
import { baseService } from '../../../services';
import { ERROR_CODE } from '../../../const/enum-set';
import { loginAction } from '../../../redux/actions/login';
import { loginregistercapitalpwinitcapitalinit } from '../../../const/pages-path';
import Config from '../../../const/config';

type PageDispatchProps = {
  loginAction: () => void;
  loginUser: any;
};

interface Register {
  props: IProps;
}

const mapStateToProps = state => ({
  loginUser: state.loginUser,
});

type IProps = PageDispatchProps;

@connect(
  mapStateToProps,
  dispatch => ({
    loginAction(obj) {
      dispatch(loginAction(obj));
    },
  }),
)
class Register extends Component<any, any> {
  private timer: any;
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      country: '',
      areaCode: '',
      password: '',
      nextPassword: '',
      isRegister: false,
      waitTime: 0,
    };
  }

  componentWillMount() {
    Taro.getStorage({ key: 'country' })
      .then(res => this.setState({ country: res.data }))
      .catch(() => {
        this.setState({ country: '中国大陆' });
      });

    Taro.getStorage({ key: 'areaCode' })
      .then(res => this.setState({ areaCode: res.data }))
      .catch(() => {
        this.setState({ areaCode: 86 });
      });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getCls = base => {
    const { isRegister, password, nextPassword, phone, code } = this.state;
    if (isRegister) {
      const isBtnDisabled = !password || !nextPassword;
      return classNames(base, isBtnDisabled && `${base}-disabled`);
    } else {
      const isBtnDisabled = !phone || !code;
      return classNames(base, isBtnDisabled && `${base}-disabled`);
    }
  };

  handlePhoneChange = e => {
    this.setState({ phone: e.detail.value });
  };

  handleCodeChange = e => {
    this.setState({ code: e.detail.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.detail.value });
  };

  handleNextPasswordChange = e => {
    this.setState({ nextPassword: e.detail.value });
  };

  handleNextStep = () => {
    this.setState({ isRegister: true });
  };

  handleAffirm = async () => {
    const { areaCode, phone, password, code, country } = this.state;
    Taro.showLoading({ title: '注册中...' });
    await baseService.register({ type: 1, phone: `+${areaCode}-${phone}`, password, code }).then((result: any) => {
      console.log('register data=', result);
      if (result.code === ERROR_CODE.SUCCESS) {
        Taro.hideLoading();
        // @ts-ignore
        // eslint-disable-next-line taro/this-props-function
        this.props.loginAction(result.data);
        Config.headers.token = result.data.token || '';
        Config.headers.uid = result.data.uid || '';
        // Config.encrypt_pwd = result.data.encrypt_pwd || '';
        Taro.setStorage({ key: 'account', data: phone });
        Taro.setStorage({ key: 'country', data: country });
        Taro.setStorage({ key: 'areaCode', data: areaCode });
        Taro.navigateTo(loginregistercapitalpwinitcapitalinit);
      } else {
        Taro.hideLoading();
        Taro.showToast({ title: result.msg, icon: 'none' });
      }
    });
  };

  handleBack = () => {
    const { isRegister } = this.state;
    if (isRegister) {
      this.setState({ isRegister: false });
      this.setState({ password: '' });
      this.setState({ nextPassword: '' });
    } else {
      Taro.navigateBack();
    }
  };

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

  onGetCodePress = async () => {
    const { areaCode, phone } = this.state;
    Taro.showLoading({ title: '发送中...' });
    // eslint-disable-next-line camelcase
    await baseService.registerCode({ auth_type: 1, auth_data: `+${areaCode}-${phone}` }).then((result: any) => {
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

  render() {
    const { isRegister, country, areaCode, phone, code, password, nextPassword, waitTime } = this.state;
    return (
      <View>
        <Header handleBack={this.handleBack} />
        {!isRegister ? (
          <View className='register-view'>
            <Text className='register-view-title'>注册</Text>
            <View className='register-view-countryView'>
              <Text className='register-view-countryView-text1'>{country}</Text>
              <Text className='register-view-countryView-text1'>{`+${areaCode}`}</Text>
              <Image src={ImageSet.icon_choice} className='register-view-countryView-image' />
            </View>
            <View className='code-register-view'>
              <Input
                className='register-view-phone-input'
                type='number'
                placeholder='手机号'
                value={phone}
                onInput={this.handlePhoneChange.bind(this)}
                placeholderClass='input-placeholder'
              />
              <View className='register-view-code-input-view'>
                <Input
                  className='register-view-code-input-view-input'
                  type='number'
                  placeholder='验证码'
                  value={code}
                  onInput={this.handleCodeChange.bind(this)}
                  placeholderClass='input-placeholder'
                />
                {waitTime <= 0 ? (
                  <Text
                    className={classNames('register-view-code-input-view-text', !phone && 'input-placeholder')}
                    onClick={phone ? this.onGetCodePress : () => {}}
                  >
                    获取验证码
                  </Text>
                ) : (
                  <Text className='register-view-code-input-view-text'>{`${waitTime}s`}</Text>
                )}
              </View>

              <Button className={this.getCls('next-step-btn')} onClick={this.handleNextStep}>
                <Text className='next-step-btn-text'>下一步</Text>
              </Button>

              <View className='login-text-view'>
                <Text className='login-text-view-text1'>已有账号?</Text>
                <Text className='login-text-view-text2'>去登录</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className='register-view'>
            <Text className='register-view-title'>注册</Text>
            <View className='code-register-view'>
              <Input
                className='code-register-view-next-password'
                type='number'
                placeholder='请输入密码'
                password
                value={password}
                onInput={this.handlePasswordChange.bind(this)}
                placeholderClass='input-placeholder'
              />
              <Input
                className='code-register-view-next-password'
                type='number'
                placeholder='请再次输入密码'
                password
                value={nextPassword}
                onInput={this.handleNextPasswordChange.bind(this)}
                placeholderClass='input-placeholder'
              />
              <Button className={this.getCls('next-step-btn')} onClick={this.handleAffirm}>
                <Text className='next-step-btn-text'>确认</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Register;
