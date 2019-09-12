import Taro, { useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { createSelector } from 'reselect';
import { connect } from '@tarojs/redux';
import 'taro-ui/dist/style/components/float-layout.scss';
import 'taro-ui/dist/style/components/action-sheet.scss';
import { DispatchProps, Props } from './interfaces';
import Header from './component/header';
import HeaderButton from './component/header-button';
import MidComponent from './component/mid-component';
import BottomHeader from './component/bottom-header';
import DealItem from './component/deal-item';
import HeaderTitle from '../../components/header/header';
import DealModal from './deal-modal';
import BottomModal from './bottom-modal';
import Colors from '../../const/colors';
import { addOrSub, arrAlter, depthArr, depthBuy, depthSell } from './exchange-func';
import './index.scss';
import mapDispatchToProps from './map-dispatch-to-props';

/**
 * 交易首页
 */
//
// type PageState = {};
//
// type IProps = DispatchProps & Props & StateProps;
//
// interface Exchange {
//   props: IProps;
// }

const Exchange = (props: DispatchProps & Props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isDealOpen: false, //是否打开交易面板
  //     isBuyOrSell: true, //真为点击买假为点击卖
  //     isOpenPrice: false, //是否打开限价面板
  //     priceData: [], //限价面板数据 格式（{text:aaa,color:true,onItem:}） //color为真时蓝色 返回下标
  //     isOpenDepth: false, //是否打开深度面板
  //     depthData: [], //深度面板数据 格式（{text:aaa,color:true,onItem:}） //color为真时蓝色 返回下标
  //     depthType: '0', //盘口状态
  //     isLogin: true, //是否登录
  //     inputText1: '', //第一个输入框里的值
  //     inputPlace1: '', //第一个输入框里的默认值
  //     inputText2: '', //第二个输入框里的值
  //     inputPlace2: '', //第二个输入框里的默认值
  //     isInput: false, //是否是市价 true是市价
  //   };
  // }

  const [isDealOpen, setIsDealOpen] = useState(false); //是否打开交易面板
  const [isBuyOrSell, setIsBuyOrSell] = useState(true); //真为点击买假为点击卖
  const [isOpenPrice, setIsOpenPrice] = useState(false); //是否打开限价面板
  const [priceData, setPriceData] = useState([{}]); //color为真时蓝色 返回下标
  const [isOpenDepth, setIsOpenDepth] = useState(false); //是否打开深度面板
  const [depthData, setDepthData] = useState([{}]); //color为真时蓝色 返回下标
  const [depthType, setDepthType] = useState('0'); //盘口状态
  const [isLogin, setIsLogin] = useState(true); //是否登录
  const [inputText1, setInputText1] = useState(''); //第一个输入框里的值
  const [inputPlace1, setInputPlace1] = useState(''); //第一个输入框里的默认值
  const [inputText2, setInputText2] = useState(''); //第二个输入框里的默认值
  const [inputPlace2, setInputPlace2] = useState(''); //第二个输入框里的默认值
  const [isInput, setIsInput] = useState(false); //第二个输入框里的默认值
  const [tmpBuyData, setTmpBuyData] = useState([{}]); //盘口买入
  const [tmpSellData, setTmpSellData] = useState([{}]); //盘口卖出

  // componentDidMount() {
  //   // 初始化数据
  //   //限价面板数据
  //   this.state.priceData.push({ text: '限价', color: Colors.colorA1, onItem: this.onPriceBack });
  //   this.state.priceData.push({ text: '市价', color: Colors.colorB2, onItem: this.onPriceBack });
  //   //初始化深度面板数据 （暂时）
  //   this.state.depthData.push({ text: '1位小数', color: Colors.colorA1, onItem: this.onDepthBack });
  //   this.state.depthData.push({ text: '2位小数', color: Colors.colorB2, onItem: this.onDepthBack });
  //   this.state.depthData.push({ text: '3位小数', color: Colors.colorB2, onItem: this.onDepthBack });
  //   this.state.depthData.push({ text: '4位小数', color: Colors.colorB2, onItem: this.onDepthBack });
  //   this.state.depthData.push({ text: '1位整数', color: Colors.colorB2, onItem: this.onDepthBack });
  //   this.state.depthData.push({ text: '2位整数', color: Colors.colorB2, onItem: this.onDepthBack });
  //
  //   depthArr(this.props.valuationMin, this.state.depthData);
  //   //初始化输入框默认值
  //   this.setState({ inputPlace1: '价格', inputPlace2: '买入量' });
  // }
  //
  //搜索页面回调
  const onSearch = () => {};
  //K线回调
  const onKLine = () => {};
  //上方买入按钮回调
  const onBuy = () => {
    setIsBuyOrSell(true);
    setInputPlace2('买入量');
  };
  //上方卖出按钮回调
  const onSell = () => {
    setIsBuyOrSell(false);
    setInputPlace2('卖出量');
  };
  //打开限价 市价面板
  const onPricePanel = () => {
    setIsOpenPrice(true);
  };
  //关闭面板（包括限价/市价，深度，交易）
  const onClosePanel = () => {
    setIsDealOpen(false);
    setIsOpenPrice(false);
    setIsOpenDepth(false);
  };
  //限价面板回调
  const onPriceBack = index => () => {
    let tmpMarketPrice = index ? '市价' : '价格';
    let tmpInputValue = index ? '' : '0';
    let tmpData = arrAlter(priceData, index, Colors.colorA1, Colors.colorB2, 'color');
    setPriceData(tmpData);
    setInputPlace1(tmpMarketPrice);
    setIsInput(index);
    setInputText1(tmpInputValue);
    onClosePanel();
  };
  //打开深度面板
  const onDepthPanel = () => {
    setIsOpenDepth(true);
  };
  //深度面板回调
  const onDepthBack = index => () => {
    let tmpData = arrAlter(depthData, index, Colors.colorA1, Colors.colorB2, 'color');
    setDepthData(tmpData);
    onClosePanel();
  };

  //盘口按钮点击
  const onDepthBtn = () => {
    if (depthType === '0') {
      setDepthType('1');
    } else if (depthType === '1') {
      setDepthType('2');
    } else if (depthType === '2') {
      setDepthType('0');
    }
  };
  //左下方买卖按钮点击
  const onDealBtn = () => {
    if (isLogin) {
      setIsDealOpen(true);
    } else {
    }
  };
  //处理第一个框的方法
  const onInput1 = input => {
    setInputText1(input.detail.value);
  };
  //处理第二个框的方法
  const onInput2 = input => {
    setInputText2(input.detail.value);
  };
  //减号的回调
  const onJian = () => {
    if (isInput) {
      return;
    }
    let tmpText = addOrSub('1', inputText1, '0.1');
    setInputText1(tmpText);
  };
  //加号的回调
  const onJia = () => {
    if (isInput) {
      return;
    }
    let tmpText = addOrSub('2', inputText1, '0.1');
    setInputText1(tmpText);
  };

  useEffect(() => {
    //限价面板数据
    let tmpPriceData = [{ text: '限价', color: Colors.colorA1 }, { text: '市价', color: Colors.colorB2 }];

    //初始化深度面板数据
    let tmpDepthData = [
      { text: '1位小数', color: Colors.colorA1 },
      { text: '2位小数', color: Colors.colorB2 },
      { text: '3位小数', color: Colors.colorB2 },
      { text: '4位小数', color: Colors.colorB2 },
      { text: '1位整数', color: Colors.colorB2 },
      { text: '2位整数', color: Colors.colorB2 },
    ];

    let tmp = depthArr(props.valuationMin, tmpDepthData);
    //初始化输入框默认值
    setInputPlace1('价格');
    setInputPlace2('买入量');
    setPriceData(tmpPriceData);
    setDepthData(tmp);
  }, []);

  console.log('asdfsdfasfsa1', priceData);
  useEffect(() => {
    let tmpBuy = depthBuy(depthType, props.buyData);
    let tmpSell = depthSell(depthType, props.sellData);

    setTmpBuyData(tmpBuy);
    setTmpSellData(tmpSell);
    console.log('tmpSell', tmpSell, tmpBuy);
  }, [props.sellData, props.buyData, depthType]);

  return (
    <View>
      <HeaderTitle showHeader={false} />
      <Header
        baseCurrency={props.baseCurrency}
        paymentCurrency={props.paymentCurrency}
        leftClick={onSearch}
        rightClick={onKLine}
      />
      <View className='exchange__div' />
      <HeaderButton
        newestPrice={props.newestPrice}
        newesRmbPrice={props.newesRmbPrice}
        leftClick={onBuy}
        rightClick={onSell}
        isBuyOrSell={isBuyOrSell}
        twentyfourGain={props.twentyfourGain}
      />
      <MidComponent
        onPricePanel={onPricePanel}
        priceData={priceData}
        onDepthPanel={onDepthPanel}
        depthData={depthData}
        onDepthBtn={onDepthBtn}
        depthType={depthType}
        tmpBuyData={tmpBuyData}
        tmpSellData={tmpSellData}
        onDealBtn={onDealBtn}
        isBuyOrSell={isBuyOrSell}
        isLogin={isLogin}
        inputPlace1={inputPlace1}
        inputText1={inputText1}
        inputPlace2={inputPlace2}
        inputText2={inputText2}
        onInput1={onInput1}
        onInput2={onInput2}
        onJian={onJian}
        onJia={onJia}
        isInput={isInput}
        onDepthBack={onDepthBack}
      />
      <View className='exchange__div1' />
      <BottomHeader />
      <View className='exchange__div' />
      <DealItem />
      <DealItem />
      <DealItem />
      <DealItem />
      <DealModal isOpen={isDealOpen} close={onClosePanel} />
      <BottomModal
        isOpenPrice={isOpenPrice}
        isOpenDepth={isOpenDepth}
        close={onClosePanel}
        priceData={priceData}
        depthData={depthData}
        onPriceBack={onPriceBack}
        onDepthBack={onDepthBack}
      />
    </View>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getAuthRequest,
    (state: Record<string, any>) => state.orderBook,
    (state: Record<string, any>) => state.userEntrustOrders,
    (state: Record<string, any>) => state.marketInfo,
    (state: Record<string, any>) => state.userAvailablefunds,
    (state: Record<string, any>) => state.createEntrustOrderReply,
    (state: Record<string, any>) => state.revokeEntrustOrderReply,
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.checktradPWD,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.getAuthenOnoff,
  ],
  (
    getAuthRequest,
    orderBook,
    userEntrustOrders,
    marketInfo,
    userAvailablefunds,
    createEntrustOrderReply,
    revokeEntrustOrderReply,
    userInfo,
    checktradPWD,
    getCloudWalletType,
    getAuthenOnoff,
  ) => {
    const { msgData: orderBookMsgData = {} } = orderBook;
    const { msgData: marketInfoMsgData = {} } = marketInfo;
    const { msgData: userData = {} } = userAvailablefunds;
    const { msgData: userEntrustOrdersData = {} } = userEntrustOrders;
    const { msgData: orderReplyData = {}, inMsgId = '' } = createEntrustOrderReply;
    const { msgData: revokeEntrustOrderReplyData = {} } = revokeEntrustOrderReply;

    return {
      //marketInfo
      baseCurrency: marketInfoMsgData.baseCurrency || '--',
      basicsMin: marketInfoMsgData.basicsMin || -1,
      callAuction: marketInfoMsgData.callAuction || 0,
      dealMax: marketInfoMsgData.dealMax || 0,
      newesRmbPrice: marketInfoMsgData.newesRmbPrice || '0',
      newestPrice: marketInfoMsgData.newestPrice || '0',
      openTime: marketInfoMsgData.openTime || 0,
      paymentCurrency: marketInfoMsgData.paymentCurrency || '--',
      status: marketInfoMsgData.status || 0,
      systemTime: marketInfoMsgData.systemTime || 0,
      tradingMax: marketInfoMsgData.tradingMax || '',
      tradingMin: marketInfoMsgData.tradingMin || '',
      twentyfourGain: marketInfoMsgData.twentyfourGain || '',
      valuationMin: marketInfoMsgData.valuationMin || -1,
      //orderBook
      buyData: orderBookMsgData.buy || [],
      sellData: orderBookMsgData.sell || [],
      //userAvailablefunds
      baseBalanceData: userData.baseBalance || '0',
      paymentBalanceData: userData.paymentBalance || '0',
      //userEntrustOrders
      userEntrustOrdersData: userEntrustOrdersData || {},
      //createEntrustOrderReply
      orderInMsgId: inMsgId || '',
      entrustResult: orderReplyData.entrustResult || false,
      errorHint: orderReplyData.errorHint || '',
      //revokeEntrustOrderReply
      revokeEntrustOrderReplyData: revokeEntrustOrderReplyData || {},
      revokeResult: revokeEntrustOrderReplyData.revokeResult || false,

      userInfo: userInfo,
      authInfo: getAuthRequest,
      checktradPWD: checktradPWD,
      currency: getCloudWalletType.data,
      getAuthenOnoff: getAuthenOnoff,
    };
  },
);

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Exchange);
