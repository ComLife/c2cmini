import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import './left-bottom.scss';
import Color from '../../../../const/ui-color';

export class LeftBottom extends Component<any, any> {
  static defaultProps = {
    titleText: '交易额',
    text: '516.5463 USDT',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { titleText, text, onDealBtn, isBuyOrSell, isLogin } = this.props;
    let tmpStyle = `background-color:${Color.color_a2};`;
    let tmpStyle1 = `color:${Color.color_white};`;
    let tmpBtnText = '买 入';

    if (isLogin) {
      if (isBuyOrSell) {
        tmpStyle = `background-color:${Color.color_a2};`;
        tmpBtnText = '买 入';
      } else {
        tmpStyle = `background-color:${Color.color_a3};`;
        tmpBtnText = '卖 出';
      }
    } else {
      tmpStyle = `background-color:${Color.color_a2};`;
      tmpBtnText = '登 录';
    }

    return (
      <View className='left-bottom'>
        <View className='left-bottom__view'>
          <Text className='left-bottom__view-text1'>{titleText}</Text>
          <Text className='left-bottom__view-text2'>{text}</Text>
        </View>
        <View className='left-bottom__view1'>
          <View className='left-bottom__view1-btn' style={tmpStyle} hoverClass='on-opacity' onClick={onDealBtn}>
            <Text className='left-bottom__view1-btn-text' style={tmpStyle1}>
              {tmpBtnText}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default LeftBottom;
