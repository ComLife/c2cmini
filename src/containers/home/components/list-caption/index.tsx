import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import DivisorLine from '../../../../components/divisor-line';
import './index.scss';

interface Props {
  text: string;
}

const ListCaption = (props: Props) => {
  const { text } = props;
  return (
    <View className='container'>
      <View className='container-text'>{text}</View>
      <DivisorLine height='1px' />
    </View>
  );
};

export default ListCaption;
