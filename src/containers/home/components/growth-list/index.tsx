import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import ListSubTitle from '../list-subtitle';
import NoDataHolder from '../../../../components/no-data-holder';
import ListItem from '../list-item';
import './index.scss';

interface Props {
  data: any[];
  onItemPress?: (event: Record<string, string>) => void;
}

const GrowthList = (props: Props) => {
  const { data } = props;
  if (!data || !data.length) {
    return <NoDataHolder />;
  }

  const isLast = (index: number) => {
    return index === data.length - 1;
  };

  return (
    <View>
      <ListSubTitle text1='名称' text2='最新价' text3='涨跌幅' />
      {data.map((item: Record<string, any>, index: number) => (
        <ListItem key={index} item={item} isLast={isLast(index)} onItemPress={props.onItemPress} />
      ))}
    </View>
  );
};

export default GrowthList;
