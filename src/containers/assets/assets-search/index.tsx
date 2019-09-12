import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import Imgs from '../../../const/image-set';
import './index.scss';

interface IProps {
  inPutString: string;
  onPressChoose: () => void;
  onPressFocus: () => void;
  onPressDelete: () => void;
  closeCoin: boolean;
}

class AssetsSearch extends Component<IProps> {
  render() {
    return (
      <View className='AssetsSearch'>
        <View className='AssetsSearch-view'>
          <Image className='AssetsSearch-view-image' src={Imgs.icon_search} />
          <View onClick={this.props.onPressFocus} className='AssetsSearch-view-button'>
            <View className='AssetsSearch-view-button-view'>
              <Text className='AssetsSearch-view-button-view-text'>
                {this.props.inPutString ? this.props.inPutString : '搜索'}
              </Text>
            </View>
          </View>
        </View>
        <View className='AssetsSearch-view1'>
          {!this.props.inPutString ? (
            <View />
          ) : (
            <View className='AssetsSearch-view1-view' onClick={this.props.onPressDelete}>
              <View className='AssetsSearch-view1-view-view'>
                <Image src={Imgs.icon_delete_1} className='AssetsSearch-view1-view-view-image' />
              </View>
            </View>
          )}
          <View className='AssetsSearch-view1-view1' onClick={this.props.onPressChoose}>
            <Image
              className='AssetsSearch-view1-view1-image'
              src={this.props.closeCoin ? Imgs.icon_hiddenCash_2 : Imgs.icon_hiddenCash}
            />
          </View>
          <Text className='AssetsSearch-view1-text'>隐藏未持有币种</Text>
        </View>
      </View>
    );
  }
}

export default AssetsSearch;
