import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { addition } from '../../../utils/digital';
import { getHideText } from '../../../utils/date-utils';
import './index.scss';

interface IProp {
  walletType: string;
  balance: number;
  freezeAmount: number;
  isShow: boolean;
}

class AssetsTableItem extends Component<IProp> {
  render() {
    const value = 0; //addition(this.props.balance, this.props.freezeAmount);
    return (
      <View className='AssetsTableItem'>
        <Text className='AssetsTableItem-text'>{this.props.walletType}</Text>
        <View className='AssetsTableItem-view'>
          <View className='AssetsTableItem-view-view'>
            <Text className='AssetsTableItem-view-view-text'>可用</Text>
          </View>
          <View className='AssetsTableItem-view-view1'>
            <Text className='AssetsTableItem-view-view1-text'>冻结</Text>
          </View>
          <View className='AssetsTableItem-view-view2'>
            <Text className='AssetsTableItem-view-view2-text'>总计</Text>
          </View>
        </View>
        <View className='AssetsTableItem-view1'>
          <View className='AssetsTableItem-view1-view'>
            <Text className='AssetsTableItem-view1-view-text'>{this.props.isShow ? this.props.balance : getHideText()}</Text>
          </View>
          <View className='AssetsTableItem-view1-view1'>
            <Text className='AssetsTableItem-view1-view1-text'>
              {this.props.isShow ? this.props.freezeAmount : getHideText()}
            </Text>
          </View>
          <View className='AssetsTableItem-view1-view2'>
            <Text className='AssetsTableItem-view1-view2-text'>{this.props.isShow ? value : getHideText()}</Text>
          </View>
        </View>
        <View className='line' />
      </View>
    );
  }
}
export default AssetsTableItem;
