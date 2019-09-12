import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import Imgs from '../../../const/image-set';
import { getHideText } from '../../../utils/date-utils';
import './index.scss';

// type PageStateProps = {
//   counter: {
//     num: number;
//   };
// };

interface IProps {
  totalPrice: string | number;
  totalRMBPrice: string | number;
  onPress: () => void;
  isShow: boolean;
}

class AssetsHeader extends Component<IProps> {
  render() {
    return (
      <View className='body'>
        <View className='body-view'>
          <View className='body-view-view'>
            <Text className='body-view-view-text'>总资产</Text>
            <Text className='body-view-view-text1'>{this.props.isShow ? this.props.totalPrice : getHideText()}</Text>
            <Text className='body-view-view-text2'>USDT</Text>
            <Text className='body-view-view-text3'>≈¥{this.props.isShow ? this.props.totalRMBPrice : getHideText()}</Text>
          </View>
          <View className='endView'>
            <View className='endView-button' onClick={this.props.onPress}>
              <View className='endView-button-view'>
                <Image className='endView-button-view-image' src={Imgs.icon_set} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AssetsHeader;
