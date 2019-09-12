import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import './right-header.scss';

export class RightHeader extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className='right-header'>
        <Text className='right-header__text'>价格</Text>
        <Text className='right-header__text'>数量</Text>
      </View>
    );
  }
}

export default RightHeader;
