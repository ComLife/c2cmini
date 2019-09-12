import Taro, { Component } from '@tarojs/taro';
import { Input, Text, View } from '@tarojs/components';
import './capital.scss';
import Header from '../../../components/header/header';
import { baseService } from '../../../services';
import { ERROR_CODE } from '../../../const/enum-set';
import { homemainindex } from '../../../const/pages-path';

class CapitalPwdInit extends Component<any, any> {
  private input: Taro.RefObject<any>;

  constructor(props) {
    super(props);
    this.state = {
      isSetPass: false,
      password: '',
      passwordSure: '',
    };
    this.input = Taro.createRef();
  }

  handlePasswordChange = e => {
    this.setState({ password: e.detail.value }, () => {
      this.nextTep(this.state.password);
    });
  };

  handleNextPasswordChange = e => {
    this.setState({ passwordSure: e.detail.value }, () => {
      this.nextTep(this.state.passwordSure);
    });
  };

  // 资金密码
  checkFundPassword = str => {
    // 6位数字
    const reg = /^\d{6}$/;
    if (!reg.test(str)) {
      return false;
    }
    return true;
  };

  nextTep = password => {
    const { isSetPass } = this.state;
    if (password.length === 6 && !isSetPass) {
      if (this.checkFundPassword(password)) {
        this.setState({ isSetPass: true });
      } else {
        Taro.showToast({ title: '资金密码包含非数值字符', icon: 'none' });
      }
    } else if (password.length === 6 && isSetPass) {
      if (this.checkFundPassword(password) && this.state.password === this.state.passwordSure) {
        this.passInit(password);
      } else {
        this.setState({ passwordSure: '' });
        Taro.showToast({ title: '两次输入的密码不一致,请重新设置!', icon: 'none' });
      }
    }
  };

  passInit = async password => {
    await baseService.Tradepwd({ password }).then((result: any) => {
      console.log('CapitalPwdInit data=', result);
      if (result.code === ERROR_CODE.SUCCESS) {
        Taro.switchTab(homemainindex);
      } else {
        Taro.showToast({ title: result.msg, icon: 'none' });
        this.setState({ passwordSure: '' });
      }
    });
  };

  handleBack = () => {
    const { isSetPass } = this.state;
    if (isSetPass) {
      this.setState({ isSetPass: false });
      this.setState({ password: '' });
      this.setState({ passwordSure: '' });
    } else {
      Taro.navigateBack();
    }
  };

  onFocuse = () => {
    // console.log('wwwwww=', this.input);
    // this.input.current.focus()
  };

  renderPassView(password) {
    return (
      <View className='passBoxView' onClick={this.onFocuse}>
        <View className='passBoxView-passbox'>
          {password.length >= 1 ? <Text>*</Text> : <View />}
          <View
            className='passBoxView-passbox-passBoxBot'
            style={{ backgroundColor: password.length >= 1 ? '#248aef' : '#d3dee4' }}
          />
        </View>
        <View className='passBoxView-passbox'>
          {password.length >= 2 ? <Text>*</Text> : <View />}
          <View
            className='passBoxView-passbox-passBoxBot'
            style={{ backgroundColor: password.length >= 2 ? '#248aef' : '#d3dee4' }}
          />
        </View>
        <View className='passBoxView-passbox'>
          {password.length >= 3 ? <Text>*</Text> : <View />}
          <View
            className='passBoxView-passbox-passBoxBot'
            style={{ backgroundColor: password.length >= 3 ? '#248aef' : '#d3dee4' }}
          />
        </View>
        <View className='passBoxView-passbox'>
          {password.length >= 4 ? <Text>*</Text> : <View />}
          <View
            className='passBoxView-passbox-passBoxBot'
            style={{ backgroundColor: password.length >= 4 ? '#248aef' : '#d3dee4' }}
          />
        </View>
        <View className='passBoxView-passbox'>
          {password.length >= 5 ? <Text>*</Text> : <View />}
          <View
            className='passBoxView-passbox-passBoxBot'
            style={{ backgroundColor: password.length >= 5 ? '#248aef' : '#d3dee4' }}
          />
        </View>
        <View className='passBoxView-passbox'>
          {password.length >= 6 ? <Text>*</Text> : <View />}
          <View
            className='passBoxView-passbox-passBoxBot'
            style={{ backgroundColor: password.length >= 6 ? '#248aef' : '#d3dee4' }}
          />
        </View>
      </View>
    );
  }

  render() {
    const { isSetPass, password, passwordSure } = this.state;
    return (
      <View>
        <Header handleBack={this.handleBack} />
        {!isSetPass ? (
          <View className='capital-view'>
            <Text className='capital-view-text1'>设置资金密码</Text>
            <Text className='capital-view-text2'>请设置资金密码，用于支付验证</Text>
            {this.renderPassView(password)}
            <Input
              ref={this.input}
              className='capital-view-input'
              type='number'
              maxLength={6}
              placeholder='验证码'
              focus
              value={password}
              onInput={this.handlePasswordChange.bind(this)}
              placeholderClass='input-placeholder'
            />
          </View>
        ) : (
          <View className='capital-view'>
            <Text className='capital-view-text1'>设置资金密码</Text>
            <Text className='capital-view-text2'>请再次输入资金密码</Text>
            {this.renderPassView(passwordSure)}
            <Input
              ref={this.input}
              className='capital-view-input'
              type='number'
              maxLength={6}
              placeholder='验证码'
              focus
              value={passwordSure}
              onInput={this.handleNextPasswordChange.bind(this)}
              placeholderClass='input-placeholder'
            />
          </View>
        )}
      </View>
    );
  }
}

export default CapitalPwdInit;
