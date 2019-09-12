import Taro, { Component } from '@tarojs/taro';
import { Image, Input, Text, View } from '@tarojs/components';
import Imgs from '../../../../const/image-set';
import './left-middle.scss';

export class LeftMiddle extends Component<any, any> {
  static defaultProps = {
    titleText: '限价',
    inputText1: '0',
    inputText2: '成交量',
    text1: '~ 56.32 CNY',
    text2: 'BTC',
    text3: '可用--USDT',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onInput1,
      onInput2,
      onJia,
      onJian,
      text1,
      text2,
      text3,
      inputPlace1,
      inputText1,
      inputPlace2,
      inputText2,
      isInput,
    } = this.props;

    return (
      <View className='left-middle'>
        <View className='left-middle__view'>
          <Input
            className='left-middle__view-input'
            placeholder={inputPlace1}
            type='digit'
            value={inputText1}
            onInput={onInput1}
            maxLength={12}
            disabled={isInput}
          />
          <View className='left-middle__view-div' />
          <View className='left-middle__view-btn' onClick={onJian} hoverClass='on-opacity'>
            <Image className='left-middle__view-btn-image1' src={Imgs.icon_jian} />
          </View>
          <View className='left-middle__view-btn' onClick={onJia} hoverClass='on-opacity'>
            <Image className='left-middle__view-btn-image' src={Imgs.icon_jia} />
          </View>
        </View>
        <View className='left-middle__view1'>
          <Text className='left-middle__view1-text'>{text1}</Text>
        </View>
        <View className='left-middle__view2'>
          <Input
            className='left-middle__view2-input'
            placeholder={inputPlace2}
            type='digit'
            value={inputText2}
            onInput={value => onInput2(value)}
            maxLength={12}
          />
          <View className='left-middle__view2-view'>
            <Text className='left-middle__view2-view-text'>{text2}</Text>
          </View>
        </View>
        <View className='left-middle__view3'>
          <Text className='left-middle__view3-text'>{text3}</Text>
        </View>
      </View>
    );
  }
}

export default LeftMiddle;
