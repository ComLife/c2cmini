import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import Imgs from '../../../const/image-set';
import './header.scss';

export class Header extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { leftClick, rightClick, baseCurrency, paymentCurrency } = this.props;

    return (
      <View className='exchange-header'>
        <View className='exchange-header__left'>
          <View onClick={leftClick} className='exchange-header__left-view' hoverClass='on-opacity'>
            <Image className='exchange-header__left-view-image1' src={Imgs.icon_currency} />
            <Text className='exchange-header__left-view-text'>{`${baseCurrency}/${paymentCurrency}`}</Text>
          </View>
          <View onClick={rightClick} className='exchange-header__left-view' hoverClass='on-opacity'>
            <Image className='exchange-header__left-view-image2' src={Imgs.icon_movements} />
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
