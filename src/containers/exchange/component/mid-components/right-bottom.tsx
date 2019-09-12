import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import './right-bottom.scss';
import Imgs from '../../../../const/image-set';
import Colors from '../../../../const/colors';

export class RightBottom extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { leftClick, rightClick, depthData = [], depthType } = this.props;
    const data = depthData && depthData.filter(item => item.color === Colors.colorA1);
    const tmpText = data.length ? data[0]['text'] : '1位小数';
    let tmpImg = Imgs.icon_order;
    if (depthType === '0') {
      tmpImg = Imgs.icon_order;
    } else if (depthType === '1') {
      tmpImg = Imgs.icon_order_buy;
    } else if (depthType === '2') {
      tmpImg = Imgs.icon_order_sell;
    }

    return (
      <View className='right-bottom'>
        <View className='right-bottom__view' hoverClass='on-opacity' onClick={leftClick}>
          <Text className='right-bottom__view-text'>{tmpText}</Text>
          <Image className='right-bottom__view-image' src={Imgs.icon_dropdown_2} />
        </View>
        <View className='right-bottom__view1' hoverClass='on-opacity' onClick={rightClick}>
          <Image className='right-bottom__view1-image' src={tmpImg} />
        </View>
      </View>
    );
  }
}

export default RightBottom;
