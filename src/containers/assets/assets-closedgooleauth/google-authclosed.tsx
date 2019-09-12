import Taro, { Component, Config } from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import classNames from 'classnames';
import { connect } from '@tarojs/redux';
import { createSelector } from 'reselect';

import Header from '../../../components/header/header';
import AuthInputView from '../../../containers/assets/assets-opengoogleauth/auth-inputview/auth-inputview';
import mapDispatchToProps from './map-dispatch-to-props';

import './google-authclosed.scss';

type PageDispatchProps = {
  onCloseGoogleAuthRequest: (any) => void;
  onRemoveCloseGoogleCode: () => void;
  onGetGoolgeCode: (any) => void;
  loginUser: any;
};

type IProps = PageDispatchProps;

// interface GoogleAuthClosed {
//   props: IProps;
// }

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.googleMessCode, (state: Record<string, any>) => state.closeGoogleData],
  (googleMessCode, closeGoogleData, loginUser) => {
    return {
      googleMessCode: googleMessCode,
      closeGoogleData: closeGoogleData,
      userInfo: loginUser,
    };
  },
);
// @ts-ignore
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export class GoogleAuthClosed extends Component<IProps> {
  private timer: any;
  constructor(props) {
    super(props);
    // console.log('@@@@@@@@@@@@@@=', this.props.userInfo.token);
  }
  state = {
    smscode: '', //短信验证码
    waitTime: 0,
  };

  onHandleInput = (key, value) => {
    this.setState({ [key]: value });
  };

  getCls = base => {
    const isBtnDisabled = !this.state.smscode;
    return classNames(base, isBtnDisabled && `${base}-disabled`);
  };

  // 获取短信验证码
  getMessageCode = () => {
    const token = this.props.loginUser && this.props.loginUser.token ? this.props.loginUser.token : '';
    this.props.onGetGoolgeCode({ token }).then(res => {
      // console.log('1111=', res.payload.code);
      if (res.payload.code === '1') {
        Taro.hideLoading();
        Taro.showToast({ title: '验证码发送成功，请注意查收', icon: 'none' });
        this.setState({ waitTime: 60 });
        this.codeTimer();
      } else {
        Taro.showToast({ title: res.payload.msg, icon: 'none' });
      }
    });
  };

  // 关闭谷歌认证
  closeGoogleAuth = () => {
    const { smscode } = this.state;
    this.props.onCloseGoogleAuthRequest({ msgCode: smscode }).then(res => {
      if (res.payload.code === '1') {
        console.log('谷歌认证开启的变化情况');
        Taro.navigateBack;
        this.props.onRemoveCloseGoogleCode();
      } else {
        Taro.showToast({ title: res.payload.msg, icon: 'none' });
        this.props.onRemoveCloseGoogleCode();
      }
      console.log('openGoogleAuth=', this);
    });
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

  render() {
    const { smscode, waitTime } = this.state;
    return (
      <View className='google-auth-closed'>
                
        <View className='google-auth-header'>
          <Header title='Google认证' />
        </View>
        <View className='google-auth-signtextview'>
          <Text className='google-auth-signtext'>您的账号已绑定谷歌认证功能！如果您要取消此功能，请输入您的短信验证码:</Text>
        </View>
        <View className='google-auth--inputview'>
          <View className='google-auth-getcodeview'>
            <AuthInputView
              value={smscode}
              type='number'
              placeholder='请输入短信验证码'
              title='短信验证码'
              onInput={this.onHandleInput.bind(this, 'smscode')}
            />
            {waitTime <= 0 ? (
              <Text className='google-auth-getcodeview-textnormal' onClick={this.getMessageCode}>
                获取验证码
              </Text>
            ) : (
              <Text className='google-auth-getcodeview-text'>{`${waitTime}s`}</Text>
            )}
          </View>
                   
        </View>
        <View className='goole-auth-buttonview'>
          <Button className={this.getCls('google-authclosedBtn')} onClick={this.closeGoogleAuth}>
              <Text className='google-authclosedBtn-text'>关闭Google认证</Text>
          </Button>
        </View>
            
      </View>
    );
  }
}

export default GoogleAuthClosed;
