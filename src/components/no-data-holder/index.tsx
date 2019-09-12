import Taro from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import ImageSet from '../../const/image-set';
import './index.scss';

interface Props {
  text?: string;
  style?: Record<string, string>;
  textStyle?: Record<string, string>;
}

//<NoDataHolder style={{'padding':'300px 0'}} textStyle={{'color': 'red'}} />
const NoDataHolder = (props: Props) => {
  const { style, textStyle, text = '暂无数据' } = props;
  return (
    <View className='container' style={style}>
      <Image className='container-img' src={ImageSet.img_miss} />
      <Text className='container-text' style={textStyle}>
        {text}
      </Text>
    </View>
  );
};

export default NoDataHolder;
