import Taro, { Component, ComponentClass } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { createSelector } from 'reselect';
import { connect } from '@tarojs/redux';
import 'taro-ui/dist/style/components/action-sheet.scss';
import 'taro-ui/dist/style/components/float-layout.scss';
import ListView from 'taro-listview';
import './index.scss';
import HeaderTitle from '../../../components/header/header';
import Header from './components/header';
import SelectPage from './components/select-page';
import Item from './components/item';
import BottomModal from './components/bottom-modal';
import Colors from '../../../const/colors';
import { arrAlter, detailDataAlter } from '../../exchange/exchange-func';

import { DispatchProps, Props, StateProps } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';

type PageState = {};

type IProps = Props & DispatchProps & StateProps;

interface AccountDetail {
  props: IProps;
}

const info = Taro.getSystemInfoSync();

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.getAllCloudWalletType,
    (state: Record<string, any>) => state.chenkBbLog,
    (state: Record<string, any>) => state.chenkRuleLog,
  ],
  (getCloudWalletType, getAllCloudWalletType, chenkBbLog, chenkRuleLog) => {
    const { code = '', data = {}, msg = '' } = chenkBbLog;
    const { data: data1 = {} } = chenkRuleLog;
    const { data: tmpData = {} } = getAllCloudWalletType;

    let dataList = [];
    let dataList1 = [];
    let totalPageCount = 0;
    let totalPageCount1 = 0;
    const tmpDataList = tmpData && tmpData.dataList ? tmpData.dataList : [];
    if (data) {
      dataList = data.dataList;
      totalPageCount = data.totalPageCount;
    }
    if (data1) {
      dataList1 = data1.dataList;
      totalPageCount1 = data1.totalPageCount;
    }
    return {
      getCloudWalletTypeCode: getCloudWalletType.data,
      getAllCloudWalletTypeCode: tmpDataList,
      getLogList: dataList,
      getLogRuleList: dataList1,
      logCode: code,
      getTotalPage: totalPageCount,
      getRuleTotalPage: totalPageCount1,
      logMsg: msg,
    };
  },
);

// @ts-ignore
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class AccountDetail extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectData: [], //上方选择的当前显示数据
      isOpenDate: false, //上方选择日期的开关
      isOpenCion: false, //上方选择币种的开关
      isOpenType: false, //上方选择类型的开关
      dateData: [], //日期数据
      cionData: [], //币种数据
      typeData: [], //类型数据
      type: this.$router.params.type || '', //真为法币 假为币币
      itemData: [], //item数据
      itemPage: 1, //当前页数
      itemMaxPage: 1, //最大页数
      hasMore: true,
    };
    console.log('aaaaa', this.props.getAllCloudWalletTypeCode);
  }

  componentDidMount() {
    console.log('aaasdas', this.$router.params.type);
    const data = [
      { text: '最近七天', click: this.onOpenDate, style: 'flex-start' },
      { text: '全部币种', click: this.onOpenCion, style: 'center' },
      { text: '全部类型', click: this.onOpenType, style: 'flex-end' },
    ];

    if (!this.props.getAllCloudWalletTypeCode && !this.props.getAllCloudWalletTypeCode.length) {
      this.props.onAllCloudWalletTypeRequest();
    }

    this.state.dateData.push({ text: '当　　天', color: Colors.colorB2, type: 0, onItem: this.onDateBack });
    this.state.dateData.push({ text: '最近一天', color: Colors.colorB2, type: 1, onItem: this.onDateBack });
    this.state.dateData.push({ text: '最近三天', color: Colors.colorB2, type: 3, onItem: this.onDateBack });
    this.state.dateData.push({ text: '最近七天', color: Colors.colorA1, type: 7, onItem: this.onDateBack });
    this.state.dateData.push({ text: '最近一月', color: Colors.colorB2, type: 30, onItem: this.onDateBack });

    this.state.cionData.push({ text: '全部币种', color: Colors.colorA1, type: '', onItem: this.onCionBack });

    this.state.typeData.push({ text: '全部类型', color: Colors.colorA1, type: 0, onItem: this.onTypeBack });

    this.initData();
    this.onRequest(true, () => {});
    this.setState({ selectData: data, type: this.$router.params.type });
  }

  componentWillUnmount() {}

  initData = () => {
    const { getAllCloudWalletTypeCode } = this.props;
    const { cionData, typeData, type } = this.state;
    let tmpType = type ? 1 : 2;
    if (type) {
      typeData.push({ text: '转　　出', color: Colors.colorB2, type: 4, onItem: this.onTypeBack });
      typeData.push({ text: '转　　入', color: Colors.colorB2, type: 3, onItem: this.onTypeBack });
    } else {
      typeData.push({ text: '转　　出', color: Colors.colorB2, type: 1, onItem: this.onTypeBack });
      typeData.push({ text: '转　　入', color: Colors.colorB2, type: 2, onItem: this.onTypeBack });
      typeData.push({ text: '买　　入', color: Colors.colorB2, type: 3, onItem: this.onTypeBack });
      typeData.push({ text: '卖　　出', color: Colors.colorB2, type: 7, onItem: this.onTypeBack });
    }

    for (let i = 0; i < getAllCloudWalletTypeCode.length; i++) {
      if (tmpType & getAllCloudWalletTypeCode[i]['supportFlag']) {
        cionData.push({
          text: getAllCloudWalletTypeCode[i]['code'],
          color: Colors.colorB2,
          type: getAllCloudWalletTypeCode[i]['id'],
          onItem: this.onCionBack,
        });
      }
    }
  };

  onRequest = (refresh: boolean, fn) => {
    const { cionData, typeData, dateData, type, itemPage, itemData, itemMaxPage } = this.state;
    const { onRuleLogList } = this.props;
    const tmpRecent = this.conversionData(dateData);
    let tmpCoin = this.conversionData(cionData);
    let tmpType = this.conversionData(typeData);
    const tmpDate = this.dateConversion(tmpRecent);

    if (type) {
      if (!tmpCoin && tmpType === 0) {
        tmpCoin = -1;
        tmpType = '3,4';
      } else if (!tmpCoin) {
        tmpCoin = -1;
      } else if (tmpType === 0) {
        tmpType = '3,4';
      }

      if (refresh) {
        this.setState({ hasMore: true });
        //下拉刷新
        onRuleLogList({
          page: 1,
          pageSize: 10,
          walletType: tmpCoin,
          begin: tmpDate.startDate,
          end: tmpDate.endDate,
          changeTypes: tmpType,
        }).then(res => {
          if (res.payload.code === '1') {
            if (res.payload.data && res.payload.data.dataList.length) {
              this.setState({ itemData: res.payload.data.dataList, itemPage: 1, itemMaxPage: res.payload.data.totalPageCount });
            } else {
              this.setState({ itemData: [], itemPage: 1, itemMaxPage: 1 });
            }
          } else {
            //打印日志 res.msg
          }
          fn();
        });
      } else {
        if (itemPage + 1 > itemMaxPage) {
          this.setState({ hasMore: false });
          fn();
          return;
        } else {
          this.setState({ hasMore: true });
        }

        onRuleLogList({
          page: itemPage + 1,
          pageSize: 10,
          walletType: tmpCoin,
          begin: tmpDate.startDate,
          end: tmpDate.endDate,
          changeTypes: tmpType,
        }).then(res => {
          if (res.payload.code === '1') {
            if (res.payload.data && res.payload.data.dataList.length) {
              let tmpData = itemData.concat(res.payload.data.dataList);
              let tmPitemPage = itemPage + 1;
              this.setState({
                itemData: tmpData,
                itemPage: tmPitemPage,
                itemMaxPage: res.payload.data.totalPageCount,
              });
            }
          } else {
            //打印日志 res.msg
          }
          fn();
        });
      }
    } else {
      //币币
    }
  };

  conversionData = (data: any) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]['color'] === Colors.colorA1) {
        return data[i]['type'];
      }
    }
  };

  //date转换
  dateConversion = (tmpDate: number) => {
    const date = new Date();
    let tmpYear = date.getFullYear();
    let tmpMonth = date.getMonth() + 1;
    let tmpdate = date.getDate();

    if (tmpdate <= tmpDate) {
      if ((tmpMonth -= 1) === 0) {
        tmpYear -= 1;
        tmpMonth = 12;
      }
      tmpdate += 30 - tmpDate;
    } else {
      tmpdate -= tmpDate;
    }

    const tmp = tmpYear + '-' + tmpMonth + '-' + tmpdate;
    const tmp1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return { startDate: tmp.toString(), endDate: tmp1.toString() };
  };

  //开启下方弹窗
  onOpenDate = () => {
    this.setState({ isOpenDate: true });
  };

  onOpenCion = () => {
    this.setState({ isOpenCion: true });
  };

  onOpenType = () => {
    this.setState({ isOpenType: true });
  };
  //选择下方弹窗子项的回调
  onDateBack = index => () => {
    let tmpData = arrAlter(this.state.dateData, index, Colors.colorA1, Colors.colorB2, 'color');
    this.setState({ dateData: tmpData });
    detailDataAlter(this.state.selectData, 0, tmpData);
    this.onRequest(true, () => {});
    this.onClose();
  };

  onCionBack = index => () => {
    let tmpData = arrAlter(this.state.cionData, index, Colors.colorA1, Colors.colorB2, 'color');
    this.setState({ cionData: tmpData });
    detailDataAlter(this.state.selectData, 1, tmpData);
    this.onRequest(true, () => {});
    this.onClose();
  };

  onTypeBack = index => () => {
    let tmpData = arrAlter(this.state.typeData, index, Colors.colorA1, Colors.colorB2, 'color');
    this.setState({ typeData: tmpData });
    detailDataAlter(this.state.selectData, 2, tmpData);
    this.onRequest(true, () => {});
    this.onClose();
  };
  //关闭下方弹窗
  onClose = () => {
    this.setState({ isOpenDate: false, isOpenCion: false, isOpenType: false });
  };
  //返回上一页
  onReturn = () => {
    Taro.navigateBack();
  };

  onToLower = async fn => {
    this.onRequest(false, fn);
  };

  onDownRefresh = async rest => {
    this.onRequest(true, rest);
  };

  render() {
    const { isOpenDate, isOpenCion, isOpenType, selectData, dateData, cionData, typeData, type, itemData, hasMore } = this.state;
    const titleText = type ? '法币交易明细' : '币币交易明细';
    const listStyle = `${info.windowHeight - info.statusBarHeight - (173 * 0.64) / 2}px`;
    // const listStyle = `200px`;

    return (
      <View>
        <HeaderTitle showHeader={false} />
        <Header onReturn={this.onReturn} titleText={titleText} />
        <View className='exchange__div' />
        <SelectPage selectData={selectData} />
        <View className='exchange__div1' />
        <ListView
          damping={150}
          style={{ height: listStyle }}
          footerLoading='加载中'
          hasMore={hasMore}
          onScrollToLower={fn => this.onToLower(fn)}
          // onScrollToLower={fn => this.onToLower(fn)}
          onPullDownRefresh={rest => this.onDownRefresh(rest)}
        >
          {itemData &&
            itemData.length &&
            itemData.map((item: any, index: number) => (
              <Item item={item} key={index} type={type} getAllCloudWalletTypeCode={this.props.getAllCloudWalletTypeCode} />
            ))}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
          {/*<Item />*/}
        </ListView>

        <BottomModal
          isOpenDate={isOpenDate}
          isOpenCion={isOpenCion}
          isOpenType={isOpenType}
          onClose={this.onClose}
          dateData={dateData}
          cionData={cionData}
          typeData={typeData}
        />
      </View>
    );
  }
}

export default AccountDetail as ComponentClass<Props, PageState>;
