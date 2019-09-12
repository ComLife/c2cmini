import Taro, { Component } from '@tarojs/taro';
import { Button, Image, Input, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import classNames from 'classnames';
import ImageSet from '../../../const/image-set';
import './login.scss';
import Header from '../../../components/header/header';
import { baseService } from '../../../services';
import { getDecryptWithAES } from '../../../utils/signature';
import { loginAction } from '../../../redux/actions/login';
import { ERROR_CODE } from '../../../const/enum-set';
import Config from '../../../const/config';
import {
  internationalization,
  loginregisterforgetpasswordchangepassword,
  loginregisterregisterregister,
} from '../../../const/pages-path';

type PageDispatchProps = {
  loginAction: () => void;
};

interface Login {
  props: IProps;
}

type IProps = PageDispatchProps;

@connect(
  ({}) => ({}),
  dispatch => ({
    loginAction(obj) {
      dispatch(loginAction(obj));
    },
  }),
)
class Login extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      country: '',
      areaCode: '',
    };
  }

  componentWillMount() {
    Taro.getStorage({ key: 'account' })
      .then(res => this.setState({ phone: res.data }))
      .catch(() => {
        this.setState({ phone: '' });
      });

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

  handlePhoneChange(e) {
    this.setState({ phone: e.detail.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.detail.value });
  }

  getCls = base => {
    const isBtnDisabled = !this.state.phone || !this.state.password;
    return classNames(base, isBtnDisabled && `${base}-disabled`);
  };

  onLogin = async () => {
    const { areaCode, phone, password, country } = this.state;
    // eslint-disable-next-line camelcase
    await baseService.login({ phone: `+${areaCode}-${phone}`, password, encrypt_flag: false }).then((originResp: any) => {
      const decryptResult = getDecryptWithAES(originResp.result);
      const result = JSON.parse(decryptResult);
      if (result.code === ERROR_CODE.SUCCESS) {
        // @ts-ignore
        // eslint-disable-next-line taro/this-props-function
        this.props.loginAction(result.data);
        Config.headers.token = result.data.token || '';
        Config.headers.uid = result.data.uid || '';
        // Config.encrypt_pwd = result.data.encrypt_pwd || '';
        Taro.navigateBack();
        Taro.setStorage({ key: 'account', data: phone });
        Taro.setStorage({ key: 'country', data: country });
        Taro.setStorage({ key: 'areaCode', data: areaCode });
        Taro.setStorage({ key: 'token', data: result.data.token });
        Taro.setStorage({ key: 'uid', data: result.data.uid });
      } else {
        Taro.showToast({ title: result.msg, icon: 'none' });
      }
    });
  };

  handleGoRegister() {
    Taro.navigateTo(loginregisterregisterregister);
  }

  handleGoForget() {
    Taro.navigateTo(loginregisterforgetpasswordchangepassword);
  }

  handleGoInter = () => {
    Taro.navigateTo(internationalization);
  };

  render() {
    return (
      <View>
        <Header />
        <View className='login-view'>
          <Image src={ImageSet.icon_logo} className='login-view-header-icon' />
          <View className='login-view-countryView' onClick={this.handleGoInter}>
            <Text className='login-view-countryView-text1'>{this.state.country}</Text>
            <Text className='login-view-countryView-text1'>{`+${this.state.areaCode}`}</Text>
            <Image src={ImageSet.icon_choice} className='login-view-countryView-image' />
          </View>
          <Input
            className='login-view-input'
            type='number'
            placeholder='手机号'
            value={this.state.phone}
            onInput={this.handlePhoneChange.bind(this)}
            placeholderClass='input-placeholder'
          />
          <Input
            className='login-view-input'
            type='number'
            placeholder='密码'
            password
            value={this.state.password}
            onInput={this.handlePasswordChange.bind(this)}
            placeholderClass='input-placeholder'
          />
          <Button className={this.getCls('loginBtn')} onClick={this.onLogin}>
            <Text className='loginBtn-login-text'>登录</Text>
          </Button>
          <View className='forgetText' onClick={this.handleGoForget}>
            <Text>忘记密码</Text>
          </View>

          <View className='registerView' onClick={this.handleGoRegister}>
            <Text className='registerView-text1'>还没注册账号?</Text>
            <Text className='registerView-text2'>去注册</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
