import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import './right-middle.scss';
import Color from '../../../../const/ui-color';

export class RightMiddle extends Component<any, any> {
  static defaultProps = {
    data: [
      { entrustPrice: '', entrustNum: '' },
      { entrustPrice: '', entrustNum: '' },
      { entrustPrice: '', entrustNum: '' },
      { entrustPrice: '', entrustNum: '' },
      { entrustPrice: '', entrustNum: '' },
    ],
    data1: [],
    type: '0',
  };

  constructor(props) {
    super(props);
  }

  backStyle = (bool: boolean) => {
    const { type } = this.props;
    let tmpColor = '';
    switch (type) {
      case '0':
        tmpColor = bool ? `color:${Color.color_a3};` : `color:${Color.color_a2};`;
        break;
      case '1':
        tmpColor = `color:${Color.color_a2};`;
        break;
      case '2':
        tmpColor = `color:${Color.color_a3};`;
        break;
    }

    return tmpColor;
  };

  renderShowMap = data => {
    const textStyle = this.backStyle(true);
    return data.map((item: any, index: number) => (
      <View className='right-middle__map' key={index}>
        <Text className='right-middle__map-text' style={textStyle}>
          {item.entrustPrice}
        </Text>
        <Text className='right-middle__map-text'>{item.entrustNum}</Text>
      </View>
    ));
  };

  renderShowMap1 = data => {
    const textStyle = this.backStyle(false);
    return data.map((item: any, index: number) => (
      <View className='right-middle__map' key={index}>
        <Text className='right-middle__map-text' style={textStyle}>
          {item.entrustPrice}
        </Text>
        <Text className='right-middle__map-text'>{item.entrustNum}</Text>
      </View>
    ));
  };

  renderShowDiv = () => {
    return (
      <View className='right-middle__map'>
        <View className='right-middle__map-div' />
      </View>
    );
  };

  render() {
    const { depthType, tmpSellData, tmpBuyData } = this.props;
    console.log('aaaaaaaaa', tmpBuyData, tmpSellData, depthType);
    let data = [{}];
    let data1 = [{}];
    if (depthType === '0') {
      if (!tmpSellData.length) {
        data = [
          { entrustPrice: '', entrustNum: '' },
          { entrustPrice: '', entrustNum: '' },
          { entrustPrice: '', entrustNum: '' },
          { entrustPrice: '', entrustNum: '' },
          { entrustPrice: '', entrustNum: '' },
        ];
        data1 = tmpBuyData;
      } else {
        data = tmpSellData;
        data1 = tmpBuyData;
      }
    } else if (depthType === '1') {
      data = tmpBuyData;
    } else if (depthType === '2') {
      data = tmpSellData;
    }

    return (
      <View className='right-middle'>
        {this.renderShowMap(data)}
        {depthType === '0' && this.renderShowDiv()}
        {depthType === '0' && this.renderShowMap1(data1)}
      </View>
    );
  }
}

export default RightMiddle;
