import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import './header-button.scss';
import Color from '../../../const/ui-color';
import { formatNumberBase, toNumber } from '../../../utils/digital';

export class HeaderButton extends Component<any, any> {
  static defaultProps = {
    titleText1: '23235.23',
    titleText2: '12152.21',
    isBuyOrSell: true,
    isRiseOrFall: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { newestPrice, newesRmbPrice, leftClick, rightClick, isBuyOrSell, twentyfourGain } = this.props;

    let tmpColor1 = `background-color:${Color.color_a2}`;
    let tmpColor2 = `background-color:${Color.color_b5}`;
    let tmpColor3 = `color:${Color.color_white}`;
    let tmpColor4 = `color:${Color.color_b2}`;
    let tmpColor5 = toNumber(twentyfourGain) >= 0 ? `color:${Color.color_a2}` : `color:${Color.color_a3}`;
    let tmpPrice = `≈ ${formatNumberBase(newesRmbPrice, 2)} CNY`;

    if (isBuyOrSell) {
      tmpColor1 = `background-color:${Color.color_a2}`;
      tmpColor2 = `background-color:${Color.color_b5}`;
      tmpColor3 = `color:${Color.color_white}`;
      tmpColor4 = `color:${Color.color_b2}`;
    } else {
      tmpColor1 = `background-color:${Color.color_b5}`;
      tmpColor2 = `background-color:${Color.color_a3}`;
      tmpColor3 = `color:${Color.color_b2}`;
      tmpColor4 = `color:${Color.color_white}`;
    }

    return (
      <View className='exchange-header-button'>
        <View className='exchange-header-button__all'>
          <View className='exchange-header-button__all-left'>
            <View onClick={leftClick} className='exchange-header-button__all-left-btn1' style={tmpColor1}>
              <Text className='exchange-header-button__all-left-btn1-text' style={tmpColor3}>
                买 入
              </Text>
            </View>
            <View onClick={rightClick} className='exchange-header-button__all-left-btn2' style={tmpColor2}>
              <Text className='exchange-header-button__all-left-btn2-text' style={tmpColor4}>
                卖 出
              </Text>
            </View>
          </View>
          <View className='exchange-header-button__all-right'>
            <Text className='exchange-header-button__all-right-text1' style={tmpColor5}>
              {newestPrice}
            </Text>
            <Text className='exchange-header-button__all-right-text2'>{tmpPrice}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HeaderButton;
