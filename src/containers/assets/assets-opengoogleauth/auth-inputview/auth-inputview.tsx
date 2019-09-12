import Taro, { Component } from '@tarojs/taro';
import { Input, Text, View } from '@tarojs/components';

import './auth-inputview.scss';

export default class AuthInputView extends Component {
  static defaultProps = {
    type: 'text',
    title: '',
    rightTitle: '',
    value: '',
    placeholder: '',
    isCanedit: true, //是否能编辑
    content: '', //内容
    focus: false,
    password: false,
    compStyle: '',
    inputStyle: '',
    onInput: () => {},
    onRightClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onR: () => {},
  };

  onHandleInput = e => {
    this.props.onInput(e.detail.value);
  };

  onRightClick = () => {
    // console.log('righclick')
    this.props.onRightClick();
  };

  render() {
    const {
      type,
      title,
      rightTitle,
      value,
      placeholder,
      isCanedit,
      content,
      focus,
      password,
      compStyle,
      inputStyle,
      onFocus,
      onBlur,
    } = this.props;

    return (
      <View className='auth-input-item' style={this.props.compStyle}>
        <Text className='auth-input-item__title'>{title}</Text>
        <View className='auth-input-item__view'>
          {!!isCanedit && (
            <Input
              className='auth-input-item__input'
              style={inputStyle}
              type={type}
              value={value}
              focus={focus}
              password={password}
              placeholder={placeholder}
              placeholderClass='comp-input-item__input--placeholder'
              onInput={this.onHandleInput}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          )}
          {!isCanedit && (
            <View className='auth-input-item__label'>
              <Text className='auth-input-item__label_text'>{content}</Text>
            </View>
          )}
          <View className='auth-input-item__bgview' onClick={this.onRightClick}>
            <Text className='auth-input-item__send'>{rightTitle}</Text>
          </View>
        </View>
      </View>
    );
  }
}
