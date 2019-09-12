import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import { AtButton, AtFloatLayout } from 'taro-ui';
import Imgs from '../../../const/image-set';
import './index.scss';

export class DealModal extends Component<any, any> {
  static defaultProps = {
    isOpen: false,
    title: '买入USDT',
    titleColor: '#12b886',
    oneText: '市价USDT',
    twoText: '10000',
    threeText: '市价委托',
    unitText: 'BTC',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, title, close, titleColor, oneText, twoText, threeText, unitText, jump, onPass } = this.props;
    return (
      <AtFloatLayout isOpened={isOpen} scrollY={false} onClose={close}>
        <View className='exchange-deal-modal__line' />
        <View className='exchange-deal-modal'>
          <View className='exchange-deal-modal__header'>
            <AtButton onClick={close} customStyle='border: 0PX solid #ffffff;width:40px;height:30px;'>
              <Image style='width:10px;height:10px;' src={Imgs.icon_close} />
            </AtButton>
            <Text className='exchange-deal-modal__header-text' style={{ color: titleColor }}>
              {title}
            </Text>
            <View style='width:40px' />
          </View>
          <View className='exchange-deal-modal__mid'>
            <Text className='exchange-deal-modal__mid-text1'>委托价格</Text>
            <Text className='exchange-deal-modal__mid-text2'>{oneText}</Text>
          </View>
          <View className='exchange-deal-modal__mid'>
            <Text className='exchange-deal-modal__mid-text1'>委托数量</Text>
            <View>
              <Text className='exchange-deal-modal__unit'>{twoText}</Text>
              <Text className='exchange-deal-modal__mid-text2'> {unitText}</Text>
            </View>
          </View>
          <View className='exchange-deal-modal__mid'>
            <Text className='exchange-deal-modal__mid-text1'>委托方式</Text>
            <Text className='exchange-deal-modal__mid-text2'>{threeText}</Text>
          </View>
          <View className='exchange-deal-modal__div' />
          <Text className='exchange-deal-modal__mid-text1'>资金密码</Text>
          <View className='exchange-deal-modal__zj' onClick={onPass}>
            <Text className='exchange-deal-modal__zj-text1'>*</Text>
            <Text className='exchange-deal-modal__zj-text2'>*</Text>
            <Text className='exchange-deal-modal__zj-text2'>*</Text>
            <Text className='exchange-deal-modal__zj-text2'>*</Text>
            <Text className='exchange-deal-modal__zj-text2'>*</Text>
            <Text className='exchange-deal-modal__zj-text2'>*</Text>
          </View>
          <View className='exchange-deal-modal__bottom'>
            <AtButton onClick={jump} customStyle='border: 0PX solid #ffffff;'>
              <Text className='exchange-deal-modal__bottom-text'>忘记资金密码?</Text>
            </AtButton>
          </View>
        </View>
      </AtFloatLayout>
    );
  }
}

export default DealModal;
