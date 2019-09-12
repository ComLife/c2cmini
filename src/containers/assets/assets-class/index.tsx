import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import classNames from 'classnames';
import Imgs from '../../../const/image-set';
import './index.scss';

interface IProps {
  onTransfer: () => void;
  onDetailed: () => void;
  onRecharge?: any;
  onCash?: () => void;
  walletType: number;
}

class AssetsClass extends Component<IProps> {
  onDetailed = () => {
    if (this.props.onDetailed) this.props.onDetailed();
  };

  onTransfer = () => {
    if (this.props.onTransfer) this.props.onTransfer();
  };

  onRecharge = () => {
    if (this.props.onRecharge) this.props.onRecharge(true);
  };

  onCash = () => {
    if (this.props.onCash) this.props.onCash();
  };

  render() {
    return this.props.walletType === 0 ? (
      <View className='AssetsClass'>
        <View className='AssetsClass-view'>
          <View onClick={this.onTransfer}>
            <View className={classNames('AssetsView', 'addAssets2')}>
              <Image className='AssetsView-image1' src={Imgs.icon_transfer} />
              <Text className='AssetsView-text'>资产划转</Text>
            </View>
          </View>
        </View>
        <View className='AssetsClass-view'>
          <View onClick={this.onDetailed}>
            <View className={classNames('AssetsView', 'addAssets2')}>
              <Image className='AssetsView-image' src={Imgs.icon_billing} />
              <Text className='AssetsView-text'>账单明细</Text>
            </View>
          </View>
        </View>
      </View>
    ) : (
      <View className='AssetsClass'>
        <View className='AssetsClass-view1'>
          <View className='AssetsClass-view1-button' onClick={this.onRecharge}>
            <View className={classNames('AssetsView', 'addAssets')}>
              <Image className='AssetsView-image2' src={Imgs.icon_into} />
              <Text className='AssetsView-text'>充值</Text>
            </View>
          </View>
        </View>
        <View className='AssetsClass-view2'>
          <View onClick={this.onCash}>
            <View className={classNames('AssetsView', 'addAssets')}>
              <Image className='AssetsView-image2' src={Imgs.withdrawal} />
              <Text className='AssetsView-text'>提现</Text>
            </View>
          </View>
        </View>
        <View className='AssetsClass-view3'>
          <View onClick={this.onTransfer}>
            <View className={classNames('AssetsView', 'addAssets1')}>
              <Image className='AssetsView-image1' src={Imgs.icon_transfer} />
              <Text className='AssetsView-text'>资产划转</Text>
            </View>
          </View>
        </View>
        <View className='AssetsClass-view3'>
          <View onClick={this.onDetailed}>
            <View className={classNames('AssetsView', 'addAssets1')}>
              <Image className='AssetsView-image' src={Imgs.icon_billing} />
              <Text className='AssetsView-text'>账单明细</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AssetsClass;
