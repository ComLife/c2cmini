import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import DivisorLine from '../../../../components/divisor-line';
import { formatKMUnit, formatNumberBase, formatPositiveSymbol } from '../../../../utils/digital';
import './index.scss';

interface Props {
  item: Record<string, any>;
  isLast: boolean;
  onItemPress?: (event: Record<string, string>) => void;
}

const ListItem = (props: Props) => {
  const { item, isLast, onItemPress } = props;
  if (!item) {
    return null;
  }

  const onPress = () => {
    onItemPress && onItemPress(item);
  };

  const data1 = item.baseCurrency || '--';
  const data2 = item.paymentCurrency || '--';
  const data3 = '24H量';
  const data4 = formatKMUnit(item.twentyfourTurnover);
  const data5 = item.newestPrice && item.newestPrice !== '0' ? item.newestPrice : '--';
  const data6 = item.newesRmbPrice && item.newesRmbPrice !== '0' ? `≈ ￥${formatNumberBase(item.newesRmbPrice)}` : '--';
  const data7 = formatPositiveSymbol(item.twentyfourGain); // 24小时交易量

  return (
    <View className='container' onClick={onPress}>
      <View className='container-wrapper'>
        <View className='container-left-wrap'>
          <View className='container-left-wrap-name-wrapper'>
            <View className='container-left-wrap-name-wrapper-base-name'>{data1}</View>
            <View className='container-left-wrap-name-wrapper-coin-name left-space'>{`/${data2}`}</View>
          </View>
          <View className='container-left-wrap-name-wrapper'>
            <View className='container-left-wrap-name-wrapper-24-count'>{data3}</View>
            <View className='container-left-wrap-name-wrapper-24-count left-space2'>{data4}</View>
          </View>
        </View>
        <View className='container-mid-wrap'>
          <View className='container-mid-wrap-row1'>{data5}</View>
          <View className='container-mid-wrap-row2'>{data6}</View>
        </View>
        <View className='container-right-wrap'>{data7}</View>
      </View>
      {!isLast && <DivisorLine height='1px' />}
    </View>
  );
};

export default ListItem;
