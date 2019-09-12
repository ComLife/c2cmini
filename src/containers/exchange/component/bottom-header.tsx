import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import Imgs from '../../../const/image-set';
import './bottom-header.scss';

export class BottomHeader extends Component<any, any> {
  static defaultProps = {
    isShowDeal: true,
  };

  constructor(props) {
    super(props);
  }

  renderShowDeal = () => {
    return (
      <View className='bottom-header__view' hoverClass='on-opacity'>
        <Image className='bottom-header__view-image' src={Imgs.icon_information} />
        <Text className='bottom-header__view-text'>交易记录</Text>
      </View>
    );
  };

  render() {
    const { isShowDeal } = this.props;

    return (
      <View className='bottom-header'>
        <Text className='bottom-header__text'>当前委托</Text>
        {isShowDeal && this.renderShowDeal()}
      </View>
    );
  }
}

export default BottomHeader;
