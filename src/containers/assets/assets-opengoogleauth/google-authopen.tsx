import Taro, { Component, Config } from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import classNames from 'classnames';
import { connect } from '@tarojs/redux';
import { createSelector } from 'reselect';

import Header from '../../../components/header/header';
import AuthInputView from '../../../containers/assets/assets-opengoogleauth/auth-inputview/auth-inputview';
import mapDispatchToProps from './map-dispatch-to-props';

import './google-authopen.scss';
// import { el } from 'date-fns/locale';

type PageDispatchProps = {
  onGoogleSecretKeyRequest: (any) => void;
  onOpenGoogleAuthRequest: (any) => void;
  onRemoveGoogleDataCode: () => void;
  onGetGoolgeCode: (any) => void;
  loginUser: any;
};

type IProps = PageDispatchProps;

// interface GoogleAuthOpen {
//   props: IProps;
// }

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.googleSecret,
    (state: Record<string, any>) => state.googleMessCode,
    (state: Record<string, any>) => state.googleAuthData,
    (state: Record<string, any>) => state.loginUser,
  ],
  (googleSecret, googleMessCode, googleAuthData, loginUser) => {
    return {
      googleSecret: googleSecret,
      googleMessCode: googleMessCode,
      googleAuthData: googleAuthData,
      userInfo: loginUser,
    };
  },
);
// @ts-ignore
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class GoogleAuthOpen extends Component<IProps> {
  private timer: any;
  constructor(props) {
    super(props);
    // console.log('@@@@@@@@@@@@@@=', this.props.userInfo.token);
  }

  state = {
    secretkey: '', //秘钥
    smscode: '', //短信验证码
    googlecode: '', //谷歌验证码
    password: '', //资金密码
    waitTime: 0,
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.getSecretKey();
  }

  onHandleInput = (key, value) => {
    this.setState({ [key]: value });
  };

  // 复制文本
  copyText = () => {
    // 提示复制成功
    Taro.showToast({ title: '复制成功', icon: 'none' });
    Taro.setClipboardData({ data: this.state.secretkey }).then(res => {
      // console.log('复制文本=', res);
    });
  };

  // 粘贴文本
  pasteText = async () => {
    const res = await Taro.getClipboardData();
    console.log(res.data);
    this.setState({ googlecode: res.data });
  };

  getCls = base => {
    const isBtnDisabled = !this.state.smscode || !this.state.googlecode || !this.state.password;
    return classNames(base, isBtnDisabled && `${base}-disabled`);
  };

  // 获取密钥
  getSecretKey = () => {
    const token = this.props.loginUser && this.props.loginUser.token ? this.props.loginUser.token : '';
    this.props.onGoogleSecretKeyRequest({ token }).then(res => {
      // console.log('1111=', res.payload.code);
      if (res.payload.code === '1') {
        console.log('aaaaaa', res.payload.data.secretKey);
        this.setState({ secretkey: res.payload.data.secretKey }, () => {
          console.log('###############=', this.state.secretkey);
        });
      } else {
        Taro.showToast({ title: res.payload.msg, icon: 'none' });
      }
    });
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

  // 开启谷歌认证
  openGoogleAuth = () => {
    const token = this.props.loginUser && this.props.loginUser.token ? this.props.loginUser.token : '';
    const { secretkey, smscode, googlecode, password } = this.state;
    this.props
      .onOpenGoogleAuthRequest({
        token,
        googlecode,
        paymentCode: password,
        msgCode: smscode,
        secretkey,
      })
      .then(res => {
        if (res.payload.code === '1') {
          console.log('谷歌认证开启的变化情况');
          Taro.navigateBack;
          this.props.onRemoveGoogleDataCode();
        } else {
          Taro.showToast({ title: res.payload.msg, icon: 'none' });
          this.props.onRemoveGoogleDataCode();
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
    const { secretkey, smscode, googlecode, password, waitTime } = this.state;
    // console.log('secretkey==',googlecode);
    return (
      <View className='google-auth'>
        <View className='google-auth-header'>
          <Header title='Google认证' />
        </View>
        <View className='google-auth--inputview'>
          <AuthInputView isCanedit={false} content={secretkey} title='秘钥' rightTitle='复制' onRightClick={this.copyText} />
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
          <AuthInputView
            value={googlecode}
            type='number'
            placeholder='请输入谷歌验证码'
            title='谷歌验证码'
            rightTitle='粘贴'
            onInput={this.onHandleInput.bind(this, 'googlecode')}
            onRightClick={this.pasteText}
          />
          <AuthInputView
            value={password}
            type='number'
            placeholder='请输入资金密码'
            password
            title='资金密码'
            onInput={this.onHandleInput.bind(this, 'password')}
          />
        </View>
        <View className='google-auth-signtextview'>
          <Text className='google-auth-signtext'>
            1.安装Google身份验证器，点击右下角”+”号，选择”手动输入验证码” \n 2.复制上面的”秘钥
            到Google身份验证器的“秘钥”输入栏，并填写你的账号，点击”完成”\n 3.复制”谷歌验证码”，粘贴到上面的”谷歌验证码”输入栏
          </Text>
        </View>
        <Button className={this.getCls('google-authopenBtn')} onClick={this.openGoogleAuth}>
          <Text className='google-authopenBtn-text'>开启Google认证</Text>
        </Button>
      </View>
    );
  }
}
