import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

interface Props {
  backgroundColor?: string;
  width?: string;
  height?: string;
}

// <DivisorLine backgroundColor={'red'} height={'100px'} width={'10px'} />
const DivisorLine = (props: Props) => {
  const { backgroundColor, height, width } = props;
  let style = {};
  if (backgroundColor) {
    style = { 'background-color': backgroundColor };
  }
  if (height) {
    style = { ...style, height };
  }
  if (width) {
    style = { ...style, width };
  }
  return <View className='container' style={style} />;
};

export default DivisorLine;
