import Taro from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import ImageSet from '../../../../const/image-set';
import './styles.scss';

interface Props {
  onAddPress?: () => void;
}

const NoChooseHolder = (props: Props) => {
  const onClick = () => {
    props.onAddPress && props.onAddPress();
  };

  return (
    <View className='container'>
      <Image className='container-img' src={ImageSet.icon_wallet} />
      <View className='container-btn' onClick={onClick}>
        + 添加自选
      </View>
    </View>
  );
};

export default NoChooseHolder;
