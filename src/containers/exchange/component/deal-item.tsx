import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import './deal-item.scss';
import Colors from '../../../const/colors';

export class DealItem extends Component<any, any> {
  static defaultProps = {
    date1: '2019-05-14',
    date2: '20:00:21',
    text1: 'ETH/EUSD',
    text2: '价格:2342.23',
    text3: '数量:0.00/10000',
    colorStyle: Colors.colorA2,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { colorStyle, date1, date2, text1, text2, text3 } = this.props;
    const tmpStyle = `background-color:${colorStyle};`;
    return (
      <View className='deal-item'>
        <View className='deal-item__view'>
          <View className='deal-item__view-view' style={tmpStyle} />
          <View className='deal-item__view-view1'>
            <Text className='deal-item__view-view1-text'>{date1}</Text>
            <Text className='deal-item__view-view1-text'>{date2}</Text>
          </View>
          <View className='deal-item__view-view2'>
            <Text className='deal-item__view-view2-text'>{text1}</Text>
            <Text className='deal-item__view-view2-text1'>{text2}</Text>
            <Text className='deal-item__view-view2-text1'>{text3}</Text>
          </View>
          <View className='deal-item__view-view3'>
            <View className='deal-item__view-view3-view' hoverClass='on-opacity'>
              <Text className='deal-item__view-view3-view-text'>撤消</Text>
            </View>
          </View>
        </View>

        <View className='deal-item__div' />
      </View>
    );
  }
}

export default DealItem;
