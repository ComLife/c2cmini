import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';

import './header.scss';
import Imgs from '../../../../const/image-set';

export default class Header extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log('this.props===', this.props);
    const { onReturn, titleText = '法币交易明细' } = this.props;

    return (
      <View className='header'>
        <View className='header__left' hoverClass='on-opacity' onClick={onReturn}>
          <Image className='header__left-image' src={Imgs.back} />
        </View>
        <View className='header__mid'>
          <Text className='header__mid-text'>{titleText}</Text>
        </View>
        <View className='header__left' />
      </View>
    );
  }
}
