import Taro from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import ImageSet from '../../../../const/image-set';
import './index.scss';

interface Props {
  text1: string;
  text2: string;
  text3: string;
  percentSort?: string;
  btn3Enabled?: boolean;
  btn3Press?: () => void;
}

const ListSubTitle = (props: Props) => {
  const { text1, text2, text3, btn3Enabled, btn3Press, percentSort } = props;

  const getPercentSortingSource = () => {
    switch (percentSort) {
      case 'asc':
        return ImageSet.icon_sorting_up;
      case 'desc':
        return ImageSet.icon_sorting_down;
      default:
        return ImageSet.icon_sorting_default;
    }
  };

  const percentSortingIcon = btn3Enabled ? (
    <Image className='container-percentSortingIcon' src={getPercentSortingSource()} />
  ) : null;

  const onClick = () => {
    btn3Press && btn3Press();
  };

  return (
    <View className='container'>
      <View className='container-left-wrapper'>{text1}</View>
      <View className='container-middle-wrapper'>{text2}</View>
      <View className='container-right-wrapper' onClick={onClick}>
        {text3}
        {percentSortingIcon}
      </View>
    </View>
  );
};

export default ListSubTitle;
