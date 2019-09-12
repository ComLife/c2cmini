import Taro from '@tarojs/taro';
import { Image } from '@tarojs/components';
import ImageSet from '../../../../const/image-set';
import './styles.scss';

const HomeLogo = () => {
  return <Image className='container' src={ImageSet.home_logo} />;
};

export default HomeLogo;
