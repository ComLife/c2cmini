import Taro, { Component } from '@tarojs/taro';
import { Button, Image, Input, Text, View } from '@tarojs/components';
import classNames from 'classnames';
import ImageSet from '../../../const/image-set';
import './forget.scss';
import Header from '../../../components/header/header';
import { baseService } from '../../../services';
import { ERROR_CODE } from '../../../const/enum-set';

class ChangePassword extends Component<any, any> {
  private timer: any;
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      password: '',
      nextPassword: '',
      country: '',
      areaCode: '',
      isNext: false,
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
    if (this.state.isNext) {
      const isBtnDisabled = !this.state.password || !this.state.nextPassword;
      return classNames(base, isBtnDisabled && `${base}-disabled`);
    } else {
      const isBtnDisabled = !this.state.phone || !this.state.code;
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
    this.setState({ isNext: true });
  };

  handleBack = () => {
    if (this.state.isNext) {
      this.setState({ isNext: false });
      this.setState({ password: '' });
      this.setState({ nextPassword: '' });
      this.setState({ code: '' });
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
    await baseService.loginpwdCode({ auth_type: 1, auth_data: `+${areaCode}-${phone}` }).then((result: any) => {
      console.log('ChangePassword data=', result);
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

  handleAffirm = async () => {
    const { areaCode, phone, password, code } = this.state;
    await baseService
      .loginpwdReset({
        // eslint-disable-next-line camelcase
        auth_type: 1,
        // eslint-disable-next-line camelcase
        auth_data: `+${areaCode}-${phone}`,
        password: password,
        // eslint-disable-next-line camelcase
        rand_code: code,
      })
      .then((result: any) => {
        if (result.code === ERROR_CODE.SUCCESS) {
          Taro.setStorage({ key: 'account', data: phone });
          Taro.navigateBack();
        } else {
          Taro.showToast({ title: result.msg, icon: 'none' });
          this.setState({ isNext: false, code: '', password: '', nextPassword: '' });
        }
      });
  };

  render() {
    return (
      <View>
        <Header handleBack={this.handleBack} />
        {!this.state.isNext ? (
          <View className='forget-view'>
            <Text className='forget-view-title'>找回密码</Text>
            <View className='forget-view-countryView'>
              <Text className='forget-view-countryView-text1'>{this.state.country}</Text>
              <Text className='forget-view-countryView-text1'>{`+${this.state.areaCode}`}</Text>
              <Image src={ImageSet.icon_choice} className='forget-view-countryView-image' />
            </View>
            <View className='code-forget-view'>
              <Input
                className='forget-view-phone-input'
                type='number'
                placeholder='手机号'
                value={this.state.phone}
                onInput={this.handlePhoneChange.bind(this)}
                placeholderClass='input-placeholder'
              />
              <View className='forget-view-code-input-view'>
                <Input
                  className='forget-view-code-input-view-input'
                  type='number'
                  placeholder='验证码'
                  value={this.state.code}
                  onInput={this.handleCodeChange.bind(this)}
                  placeholderClass='input-placeholder'
                />
                {this.state.waitTime <= 0 ? (
                  <Text
                    className={classNames('forget-view-code-input-view-text', !this.state.phone && 'input-placeholder')}
                    onClick={this.state.phone ? this.onGetCodePress : () => {}}
                  >
                    获取验证码
                  </Text>
                ) : (
                  <Text className='forget-view-code-input-view-text'>{`${this.state.waitTime}s`}</Text>
                )}
              </View>

              <Button className={this.getCls('next-step-btn')} onClick={this.handleNextStep}>
                <Text className='next-step-btn-text'>下一步</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View className='forget-view'>
            <Text className='forget-view-title'>设置新密码</Text>
            <View className='code-forget-view'>
              <Input
                className='code-forget-view-next-password'
                type='number'
                placeholder='请输入密码'
                password
                value={this.state.password}
                onInput={this.handlePasswordChange.bind(this)}
                placeholderClass='input-placeholder'
              />
              <Input
                className='code-forget-view-next-password'
                type='number'
                placeholder='请再次输入密码'
                value={this.state.nextPassword}
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

export default ChangePassword;
