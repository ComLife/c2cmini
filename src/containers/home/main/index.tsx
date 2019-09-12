import { ComponentClass } from 'react';
import Taro, { Config, PureComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { createSelector } from 'reselect';

import 'taro-ui/dist/style/components/activity-indicator.scss';
import 'taro-ui/dist/style/components/loading.scss';

import mapDispatchToProps from './map-dispatch-to-props';
import { BBS_INCREASETOP_R, BBS_INIT } from '../../../redux/action-types';
import WebSocket from '../../../services/websocket';

import DivisorLine from '../../../components/divisor-line';
import Header from '../../../components/header/header';
import HomeLogo from '../components/home-logo';
import HomeSwiper from '../components/home-swiper';
import ListCaption from '../components/list-caption';
import GrowthList from '../components/growth-list';

import { exchangeindex } from '../../../const/pages-path';
import { PageDispatchProps, PageOwnProps, PageStateProps } from './interfaces';
import './index.scss';

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.appConfig,
    (state: Record<string, any>) => state.marketInfo,
    (state: Record<string, any>) => state.bannerList,
    (state: Record<string, any>) => state.increaseTopReply,
  ],
  (appConfig, marketInfo, bannerList, increaseTopReply) => {
    const language = (appConfig && appConfig.language) || '';
    const deviceId = (appConfig && appConfig.deviceId) || '';
    const marketInfoData = marketInfo && marketInfo.msgData;
    const bannerFetching = !!bannerList.isFetching;
    const bannerData = bannerList.data || [];
    return {
      language: language,
      deviceId: deviceId,
      marketInfoData: marketInfoData,
      bannerFetching,
      bannerData,
      increaseList: increaseTopReply.msgData || [],
    };
  },
);

// @ts-ignore
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Index extends PureComponent<IProps> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    // navigationBarTitleText: '首页',
  };

  // state = {
  //   list: [1, 2, 3],
  // };

  // componentWillReceiveProps(nextProps) {
  // console.log(this.props, nextProps);
  // }

  componentDidShow() {
    console.log('bbbb');
  }

  increaseTop = () => {
    // 首页涨幅榜
    const sendData = { msgType: BBS_INCREASETOP_R, msgData: {} };
    WebSocket.getInstance().send(sendData);
    WebSocket.getInstance().onMessage(data => {
      // console.log('data.msgType=====', data.msgType);
      if (!data || data.msgType !== BBS_INCREASETOP_R) {
        return;
      }
      this.props.dispatch({ type: data.msgType, payload: data });
    });
  };

  bbsInit = () => {
    // 首页涨幅榜
    const bbsInit = { msgType: BBS_INIT, msgData: { collectionCodes: '' } };
    WebSocket.getInstance().send(bbsInit);
    WebSocket.getInstance().onMessage(data => {
      if (!data) {
        return;
      }
      this.props.dispatch({ type: data.msgType, payload: data });
    });
  };

  componentDidMount() {
    this.props.onBannerRequest();
    this.bbsInit();
    this.increaseTop();
  }

  componentDidHide() {
    console.log('dddd');
  }

  onSwiperClick = (item: Record<string, any>) => {
    console.log('onSwiperClick item===', item);
    Taro.switchTab(exchangeindex);
  };

  onGrowthItemPress = (event: Record<string, string>) => {
    const { baseCurrency, paymentCurrency } = event;
    console.log(baseCurrency, paymentCurrency);
  };

  render() {
    const { bannerFetching, bannerData, increaseList } = this.props;
    const listItems = [
      {
        baseCurrency: 'BTC',
        newesRmbPrice: '71609.61',
        newestPrice: '10057.53',
        paymentCurrency: 'USDT',
        twentyfourGain: '10057.53',
        twentyfourTurnover: '7763.337503323564432261',
      },
      {
        baseCurrency: 'ETH',
        newesRmbPrice: '663.71',
        newestPrice: '93.2177',
        paymentCurrency: 'USDT',
        twentyfourGain: '-99',
        twentyfourTurnover: '828.3654',
      },
    ];
    console.log('listItem==', listItems);

    return (
      <View className='index'>
        <Header showBackIcon={false} showHeader={false} />
        <HomeLogo />
        <HomeSwiper data={bannerData} onClick={this.onSwiperClick} isFetching={bannerFetching} />
        <DivisorLine height='10px' />
        <ListCaption text='涨幅榜' />
        <GrowthList data={increaseList} onItemPress={this.onGrowthItemPress} />
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

export default Index as ComponentClass<PageOwnProps, PageState>;
