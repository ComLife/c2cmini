import Taro, { Component } from '@tarojs/taro';
import { Image, Input, Text, View } from '@tarojs/components';
import { createSelector } from 'reselect';
import { AtIndexes } from 'taro-ui';
import { connect } from '@tarojs/redux';
import 'taro-ui/dist/style/components/toast.scss';
// import "taro-ui/dist/style/components/indexes.scss";
// import "taro-ui/dist/style/components/list.scss";
import Imgs from '../../const/image-set';
import { getCloudWallet, getCurrencysMap, groupBy, groupByLetter } from '../../utils/date-utils';
import './index.scss';

import mapDispatchToProps from './map-dispatch-to-props';

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getViewWallet,
    (state: Record<string, any>) => state.getCloudWalletAssets,
    (state: Record<string, any>) => state.getCloudWalletType,
  ],
  (getViewWallet, getCloudWalletAssets, getCloudWalletType) => {
    const currencysMap = getCurrencysMap(getCloudWalletType.data, true);
    const cloudWallet = getCloudWallet(getCloudWalletAssets.data, currencysMap, 2, 8);
    const coinWallet = getCloudWallet(getViewWallet.data, currencysMap, 2, 8);
    return {
      coinWallet: coinWallet, //bb钱包数据
      cloudWallet: cloudWallet, //云钱包数据
      currency: getCloudWalletType.data, //云钱包币种数据
    };
  },
);

// @ts-ignore
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ChooseCoin extends Component<any, any> {
  constructor(props) {
    super(props);

    const sort = groupBy(this.props.currency, 'code');
    this.state = {
      inputString: '',
      dataList: sort,
      assetsIndex: 0,
      coinChoose: false,
    };
  }

  //接收路由参数，在生命周期函数中获取
  componentWillMount() {
    // 输出 { id: 2, type: 'test' }
    this.setState({ assetsIndex: this.$router.params.assetsType, coinChoose: this.$router.params.coinChoose }, () => {
      console.log('componentWillMount', this.state.assetsIndex, this.state.coinChoose); // 输出 { id: 2, type: 'test' }
    });
  }

  // const styles = outerStyles();
  // const { goBack, getParam } = useNavigation();
  // const currecy = getParam('currencysMap');
  // const sort = groupBy(currecy, 'code');
  // const [dataList, setDataList] = useState(sort);
  // const [inputString, setInputString] = useState('');

  getNotHeld = (arrayData: any, isCoinChoose: boolean) => {
    if (isCoinChoose) {
      return arrayData.filter((item: any) => item.amount !== 0);
    } else {
      return arrayData;
    }
  };

  getOriginalSearch = (choossCurrency: any, index: number, isCoinChoose: boolean) => {
    if (choossCurrency) {
      if (index === 1) {
        return this.getNotHeld(this.props.cloudWallet, isCoinChoose).filter((item: any) => item.walletType === choossCurrency.id);
      } else {
        console.log('sort1', this.props.coinWallet, choossCurrency.id);
        return this.getNotHeld(this.props.coinWallet, isCoinChoose).filter((item: any) => item.walletType === choossCurrency.id);
      }
    } else {
      if (index === 1) {
        return this.getNotHeld(this.props.cloudWallet, isCoinChoose);
      } else {
        return this.getNotHeld(this.props.coinWallet, isCoinChoose);
      }
    }
  };

  onPressinPut = e => {
    let sort1 = [];
    if (e.detail.value.length > 0) {
      sort1 = groupByLetter(this.props.currency, 'code', e.detail.value.length, e.detail.value);
    } else {
      sort1 = groupBy(this.props.currency, 'code');
    }
    this.setState({ inputString: e.detail.value, dataList: sort1 });
  };
  //
  onPressCancel = () => {
    Taro.navigateBack();
  };
  //
  onChoose = e => {
    console.log('sort1', e);
    const dataList = {
      chooseData: this.getOriginalSearch(e.data, this.state.assetsIndex, this.state.coinChoose),
      data: e,
    };
    this.props.onAddAssetsSearch(dataList);
    Taro.navigateBack();
  };

  // renderItem = (info: any) => {
  //   var txt = info.item.code;
  //   return (
  //     <TouchableOpacity style={styles.textView} onPress={() => onChoose(info.item)}>
  //       <View style={styles.itemView}>
  //         <Text style={styles.itemText}>{txt}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // sectionComp = (info: any) => {
  //   var txt = info.section.key;
  //   return (
  //     <View style={styles.sectionView}>
  //       <Text style={styles.sectionText}>{txt}</Text>
  //     </View>
  //   );
  // };

  render() {
    return (
      <View>
        <View className='baseView'>
          <View className='baseView-flexView'>
            <Image className='baseView-flexView-imageView' src={Imgs.icon_search} />
            <Input
              className='baseView-flexView-input'
              placeholder='搜索'
              value={this.state.inputString}
              onInput={this.onPressinPut.bind(this)}
            />
          </View>
          <View className='baseView-flexView1'>
            <View className='baseView-flexView1-textView' onClick={this.onPressCancel}>
              <Text>取消</Text>
            </View>
          </View>
        </View>
        <AtIndexes list={this.state.dataList} onClick={this.onChoose.bind(this)} topKey=''></AtIndexes>
      </View>
    );
  }

  // <SectionList
  //   renderSectionHeader={sectionComp}
  //   renderItem={renderItem}
  //   sections={dataList}
  //   ItemSeparatorComponent={() => (
  //     <View>
  //       <Text></Text>
  //     </View>
  //   )}
  // />
}

export default ChooseCoin;
