import Taro from '@tarojs/taro';
import { Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import ImageSet from '../../../../const/image-set';
import './styles.scss';

interface Props {
  data: Record<string, string>[];
  onClick: (item: Record<string, any>) => void;
  isFetching: boolean;
}

const HomeSwiper = (props: Props) => {
  const { data, isFetching } = props;

  let newData = data;
  if (!newData || !newData.length) {
    newData = [{ url: ImageSet.banner }];
  }

  const onClick = (item: Record<string, any>) => () => {
    props.onClick && props.onClick(item);
  };

  return (
    <Swiper className='banner' indicatorColor='#999' indicatorActiveColor='#333' vertical={false} circular indicatorDots autoplay>
      {newData.map((item: any, index: number) => {
        return (
          <SwiperItem key={index} onClick={onClick(item)}>
            {isFetching ? <AtActivityIndicator mode='center' size={32} /> : <Image className='banner-img' src={item.url} />}
          </SwiperItem>
        );
      })}
    </Swiper>
  );
};

export default HomeSwiper;
