import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import Imgs from '../../../const/image-set';
import { getHideText } from '../../../utils/date-utils';
import './index.scss';

interface IProps {
  totalPrice: number;
  totalRmb: number;
  titleString: string;
  onPressShow: (index: number, isShow: boolean) => void;
  index: number;
  isShow: boolean;
}

class AssetsItem extends Component<IProps, {}> {
  onCheckIsShow = () => {
    const isShow = this.props.isShow;
    if (this.props.onPressShow) this.props.onPressShow(this.props.index, !isShow);
  };

  render() {
    const totalPrice = this.props.totalPrice ? this.props.totalPrice + '' : '0';
    const totalRmbPrice = this.props.totalRmb ? this.props.totalRmb + '' : '0';
    return (
      <View className='AssetsItem'>
        {/*{this.props.index === 0 ? (*/}
        {/*  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(41,77,187)', 'rgb(69,134,224)']} style={styles.linearGradientBg} />*/}
        {/*) : (*/}
        {/*  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(113,104,233)', 'rgb(172,146,246)']} style={styles.linearGradientBg} />*/}
        {/*)}*/}
        <View className={this.props.index === 0 ? 'AssetsItem-bg' : 'AssetsItem-bg1'} />
        <View className='AssetsItem-view'>
          <Text className='AssetsItem-view-text'>{this.props.titleString}</Text>
          <View onClick={this.onCheckIsShow}>
            <Image className='imageView' src={this.props.isShow ? Imgs.icon_hidden : Imgs.icon_hidden_2} />
          </View>
        </View>
        <Text className='AssetsItem-text'>{this.props.isShow ? totalPrice : getHideText()}</Text>
        <Text className='AssetsItem-text1'>{this.props.isShow ? '≈¥' + totalRmbPrice : '≈¥' + getHideText()}</Text>
      </View>
    );
  }
}

export default AssetsItem;
