import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import Imgs from '../../../../const/image-set';
import Colors from '../../../../const/colors';
import './left-header.scss';

export class LeftHeader extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { leftClick, priceData = [] } = this.props;
    const data = priceData && priceData.filter(item => item.color === Colors.colorA1);
    const tmpText = data.length ? data[0]['text'] : '限价';
    return (
      <View className='left-header' onClick={leftClick} hoverClass='on-opacity'>
        <Text className='left-header__text'>{tmpText}</Text>
        <Image className='left-header__image' src={Imgs.icon_dropdown_2} />
      </View>
    );
  }
}

export default LeftHeader;
