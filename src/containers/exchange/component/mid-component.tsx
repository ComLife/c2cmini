import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './mid-component.scss';
import LeftHeader from './mid-components/left-header';
import LeftMiddle from './mid-components/left-middle';
import LeftSchedule from './mid-components/left-schedule';
import LeftBottom from './mid-components/left-bottom';
import RightHeader from './mid-components/right-header';
import RightMiddle from './mid-components/right-middle';
import RightBottom from './mid-components/right-bottom';

export class MidComponent extends Component<any, any> {
  static defaultProps = {
    titleText: 'USDT/BTC',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onPricePanel,
      priceData,
      onDepthPanel,
      depthData,
      onDepthBtn,
      depthType,
      tmpBuyData,
      tmpSellData,
      onDealBtn,
      isBuyOrSell,
      isLogin,
      inputPlace1,
      inputText1,
      inputPlace2,
      inputText2,
      onInput1,
      onInput2,
      onJia,
      onJian,
      isInput,
    } = this.props;

    return (
      <View className='mid-component'>
        <View className='mid-component__left'>
          <LeftHeader leftClick={onPricePanel} priceData={priceData} />
          <LeftMiddle
            inputPlace1={inputPlace1}
            inputText1={inputText1}
            inputPlace2={inputPlace2}
            inputText2={inputText2}
            onInput1={onInput1}
            onInput2={onInput2}
            onJia={onJia}
            onJian={onJian}
            isInput={isInput}
          />
          <LeftSchedule />
          <LeftBottom onDealBtn={onDealBtn} isBuyOrSell={isBuyOrSell} isLogin={isLogin} />
        </View>
        <View className='mid-component__middle' />
        <View className='mid-component__right'>
          <RightHeader />
          <RightMiddle depthType={depthType} tmpBuyData={tmpBuyData} tmpSellData={tmpSellData} />
          <RightBottom leftClick={onDepthPanel} depthData={depthData} rightClick={onDepthBtn} depthType={depthType} />
        </View>
      </View>
    );
  }
}

export default MidComponent;
