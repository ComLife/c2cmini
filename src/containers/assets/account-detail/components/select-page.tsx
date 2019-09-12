import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';

import './select-page.scss';
import Imgs from '../../../../const/image-set';

export default class SelectPage extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  renderShowMap = selectData => {
    // const textStyle = this.backStyle(true);
    return selectData.map((item: any, index: number) => (
      <View
        className='select-page__btn'
        hoverClass='on-opacity'
        onClick={item.click}
        key={index}
        style={`justify-content:${item.style}`}
      >
        <Text className='select-page__btn-text'>{item.text}</Text>
        <Image className='select-page__btn-image' src={Imgs.icon_dropdown_2} />
      </View>
    ));
  };

  render() {
    // console.log('this.props===', this.props);
    const { selectData = [{}] } = this.props;
    if (!selectData && !selectData.length) {
      return;
    }
    return <View className='select-page'>{this.renderShowMap(selectData)}</View>;
  }
}
