import Taro, { useState } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { createSelector } from 'reselect';
import 'taro-ui/dist/style/components/tabs.scss';

import Header from '../../../components/header/header';
import MyChoose from '../my-choose';
import './index.scss';
import mapDispatchToProps from './map-dispatch-to-props';
import { Props } from './interfaces';

const myChooseText = '自选';

const Market = (props: Props) => {
  // console.log('this.props========', props);

  const [current, setCurrent] = useState(0);

  const onTabIndexChanged = (value: number) => {
    setCurrent(value);
  };

  const tabList = props.routes.map((item: Record<string, string>) => {
    return { title: item.title };
  });
  return (
    <View className='container'>
      <Header title='行情' showBackIcon={false} />
      <AtTabs current={current} tabList={tabList} onClick={onTabIndexChanged}>
        {props.routes.map((item: Record<string, string>, index: number) => {
          return (
            <AtTabsPane current={current} index={index} key={index}>
              {item.key === 'k1' ? <MyChoose /> : <View>{item.title}</View>}
            </AtTabsPane>
          );
        })}
      </AtTabs>
    </View>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.paymentCurrencys,
    (state: Record<string, any>) => state.marketListInfo,
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.localCollection,
  ],
  (paymentCurrencies, marketListInfo, userInfo, localCollection) => {
    const marketDataList = marketListInfo.msgData || [];
    const routes = [{ key: 'k1', title: myChooseText }]; // 产品要求：先注掉自选
    // const routes: Record<string, any>[] = [];
    if (Array.isArray(paymentCurrencies.msgData)) {
      paymentCurrencies.msgData.forEach((item: string, index: number) => {
        routes.push({ key: `k${index + 2}`, title: item });
      });
    }
    return {
      marketDataList,
      routes,
      userInfo,
      localCollection,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(Market);
