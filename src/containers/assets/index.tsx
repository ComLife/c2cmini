import Taro, { Component, Config } from '@tarojs/taro';
import { AtList } from 'taro-ui';
import { createSelector } from 'reselect';
import { connect } from '@tarojs/redux';
import { Swiper, SwiperItem, View } from '@tarojs/components';
import 'taro-ui/dist/style/components/list.scss';
import 'taro-ui/dist/style/components/icon.scss';
import { getCloudWallet, getCurrencysMap, getRMBTotalAmount, getUSDTTotalAmount } from '../../utils/date-utils';
import AssetsHeader from './assets-header';
import AssetsItem from './assets-item';
import AssetsClass from './assets-class';
import AssetsSearch from './assets-search';
import AssetsTableItem from './assets-tableItem';
import { assetsaccountdetailindex } from '../../const/pages-path';

import './index.scss';
import mapDispatchToProps from './map-dispatch-to-props';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getViewWallet,
    (state: Record<string, any>) => state.getCloudWalletAssets,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.addAssetsSearch,
  ],
  (getViewWallet, getCloudWalletAssets, getCloudWalletType, userInfo, addAssetsSearch) => {
    const currencysMap = getCurrencysMap(getCloudWalletType.data, true);
    const cloudWallet = getCloudWallet(getCloudWalletAssets.data, currencysMap, 2, 8);
    const cloudWalletUSDTPrice = getUSDTTotalAmount(cloudWallet);
    const cloudWalletRMBPrice = getRMBTotalAmount(cloudWallet);
    const coinWallet = getCloudWallet(getViewWallet.data, currencysMap, 2, 8);
    const coinUSDTPrice = getUSDTTotalAmount(coinWallet);
    const coinRMBPrice = getRMBTotalAmount(coinWallet);
    // console.log('addAssetsSearch', addAssetsSearch);
    return {
      userInfoData: userInfo ? userInfo.data : {},
      coinWallet: coinWallet, //bb钱包数据
      currency: getCloudWalletType.data, //云钱包币种数据
      coinTotalPrice: coinUSDTPrice,
      coinTotalRMBPrice: coinRMBPrice,
      cloudWallet: cloudWallet, //云钱包数据
      cloudWalletTotalPrice: cloudWalletUSDTPrice,
      cloudWalletTotalRMBPrice: cloudWalletRMBPrice,
      addAssetsSearch: addAssetsSearch,
    };
  },
);

// @ts-ignore
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Index extends Component<any, any> {
  /**'zx
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  entries = [{ title: '币币账户资产折合(USDT)' }, { title: '云钱包账户资产折合(USDT)' }];

  config: Config = {
    navigationBarTitleText: '资产',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
  };

  constructor(props) {
    super(props);
    this.state = {
      assetsIndex: 0,
      bbShow: true,
      cloudShow: true,
      coinChoose: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentDidMount() {
    this.props.onViewWalletRequest();
    this.props.onCloudWalletAssetsRequest();
    this.props.onCloudWalletTypeRequest();
    console.log('componentDidMount1111');
  }

  componentWillUnmount() {}

  componentDidShow() {
    console.log('componentDidShow');
    this.timerID = setInterval(() => {
      this.props.onViewWalletRequest();
      this.props.onCloudWalletAssetsRequest();
      this.props.onCloudWalletTypeRequest();
    }, 10000);
  }

  componentDidHide() {
    clearInterval(this.timerID);
  }

  onPullDownRefresh(): void {}

  onReachBottom(): void {}

  // 划转
  onTransfer = () => {
    // navigate('AssetsTransfer', { index: assetsWallet });
  };
  // 明细
  onDetailed = () => {
    const tmpIndex = !this.state.assetsIndex ? '?type=1' : '?type=';
    Taro.navigateTo(assetsaccountdetailindex(tmpIndex));
  };
  // 提币转账
  onCash = () => {
    // navigate('AssetsWithDrawal');
  };
  // 充值
  // eslint-disable-next-line no-unused-vars
  onRecharge = (isShow: boolean) => {
    // setShowCode(isShow);
  };
  // 充值
  openRecharge = () => {
    // setShowCode(true);
  };

  onPressSetting = () => {
    // navigate('PersonalCenter');
  };

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

  onPressShow = (index: number, isShow: boolean) => {
    if (index === 0) {
      this.setState({ bbShow: isShow });
    } else {
      this.setState({ cloudShow: isShow });
    }
  };

  onPressFocus = () => {
    console.log('onPressFocus', this.onChooseCoinCallback, this.props.currency);
    Taro.navigateTo({
      url: `/components/choose-coin/index?assetsType=${this.state.assetsIndex}&coinChoose=${this.state.coinChoose}`,
    });
  };

  onChooseCoinCallback = (choossCurrency: any) => {
    // setCurrentCoinData(choossCurrency); // 搜索的数据
    // setAssetsData(getOriginalSearch(choossCurrency, assetsWallet, coinChoose));
  };

  onPressDelete = () => {
    this.props.onRemoveAssetsSearch({});
  };

  onPressChoose = () => {
    // setCoinChoose(!coinChoose);
    // setAssetsData(getOriginalSearch(currentCoinData, assetsWallet, !coinChoose));
    const value = this.state.coinChoose;
    this.setState({ coinChoose: !value });
  };

  onCarousel = (index: any) => {
    this.setState({ assetsIndex: index.detail.current }, () => {
      if (this.props.addAssetsSearch && this.props.addAssetsSearch.data) {
        const data = {
          data: this.props.addAssetsSearch.data.data,
          name: this.props.addAssetsSearch.data.name,
        };
        const dataList = {
          chooseData: this.getOriginalSearch(this.props.addAssetsSearch.data.data, this.state.assetsIndex, this.state.coinChoose),
          data,
        };
        this.props.onAddAssetsSearch(dataList);
      }
    });
  };

  render() {
    console.log('AssetsHeader', this.state.bbShow);
    const searchString =
      this.props.addAssetsSearch && this.props.addAssetsSearch.data ? this.props.addAssetsSearch.data.name : '';
    const searchData =
      this.props.addAssetsSearch && this.props.addAssetsSearch.data ? this.props.addAssetsSearch.data.data : null;

    return (
      <View className='index'>
        <AssetsHeader
          isShow={this.state.assetsIndex === 0 ? this.state.bbShow : this.state.cloudShow}
          totalPrice={0}
          totalRMBPrice={0}
          onPress={this.onPressSetting}
        />
        <View className='blankView' />
        <Swiper
          className='swiperView'
          onChange={index => {
            this.onCarousel(index);
          }}
        >
          <SwiperItem>
            <AssetsItem
              isShow={this.state.bbShow}
              index={0}
              onPressShow={this.onPressShow}
              titleString={this.entries[0].title}
              totalRmb={0}
              totalPrice={0}
            />
          </SwiperItem>
          <SwiperItem>
            <AssetsItem
              isShow={this.state.cloudShow}
              index={1}
              onPressShow={this.onPressShow}
              titleString={this.entries[1].title}
              totalRmb={0}
              totalPrice={0}
            />
          </SwiperItem>
        </Swiper>
        <AssetsClass
          onTransfer={this.onTransfer}
          onDetailed={this.onDetailed}
          onCash={this.onCash}
          onRecharge={this.openRecharge}
          walletType={this.state.assetsIndex}
        />
        <View className='colorView' />
        <AssetsSearch
          onPressDelete={this.onPressDelete}
          onPressFocus={this.onPressFocus}
          inPutString={searchString}
          onPressChoose={this.onPressChoose}
          closeCoin={this.state.coinChoose}
        />
        <View className='lineView' />
        <AtList>
          {this.state.assetsIndex === 0
            ? this.getOriginalSearch(searchData, this.state.assetsIndex, this.state.coinChoose).map((item: any) => {
                return (
                  <AssetsTableItem
                    isShow={this.state.bbShow}
                    walletType={item.walletName}
                    balance={item.realAmount}
                    freezeAmount={item.lock}
                  />
                );
              })
            : this.getOriginalSearch(searchData, this.state.assetsIndex, this.state.coinChoose).map((item: any) => {
                return (
                  <AssetsTableItem
                    isShow={this.state.cloudShow}
                    walletType={item.walletName}
                    balance={item.realAmount}
                    freezeAmount={item.lock}
                  />
                );
              })}
        </AtList>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index;
