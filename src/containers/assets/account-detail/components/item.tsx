import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import Colors from '../../../../const/colors';
import './item.scss';
import { division } from '../../../../utils/digital';
import { formatHHmmss, formatYYYYMMDD } from '../../../../utils/date-time';

export default class Item extends Component<any, any> {
  static defaultProps = {
    leftTopText: '2019-05-20',
    leftBottomText: '20:00:00',
    midTopText: 'ETH',
    midBottomText: '转出',
    rightTopText: '-386.12345678',
    rightMidText: '手续费:123456',
    rightBottomText: '余额:38461111.11111111',
    midColor: Colors.colorA2,
    rightColor: Colors.colorA2,
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log('this.props===', this.props);
    const { item = {}, type, getAllCloudWalletTypeCode = [] } = this.props;

    let numPre = 0;
    for (let i = 0; i < getAllCloudWalletTypeCode.length; i++) {
      if (item.walletTypeCode === getAllCloudWalletTypeCode[i].code) {
        numPre = getAllCloudWalletTypeCode[i].numPrecision;
      }
    }
    const ratio = (10 ** numPre).toString();
    const leftTopText = formatYYYYMMDD(item.createTime);
    const leftBottomText = formatHHmmss(item.createTime);
    const code = item.walletTypeCode;
    let typeText = item.typeText;
    const value = item.flag
      ? division(item.amount + item.freezeAmount + item.preAmount + item.commission, ratio, 4)
      : division(item.freezeAmount + item.preAmount - item.amount + item.commission, ratio, 4);
    const allAmount: string = '余额:' + value + '';

    let amount = division(item.amount, ratio, 4);
    let tmpType = true;
    const tmpCommission = item.commission ? item.commission : 0;
    let bottomText = division(tmpCommission, ratio, 4);
    let textColor = Colors.colorA2;

    if (!type && (item.changeType === 1 || item.changeType === 7)) {
      textColor = Colors.colorA3;
      amount = '-' + amount;
    } else if (!type) {
      textColor = Colors.colorA2;
      amount = '+' + amount;
    }

    if (!type && (item.changeType === 3 || item.changeType === 7)) {
      tmpType = true;
      bottomText = '手续费:' + division(tmpCommission, ratio, 4);
    } else if (!type) {
      tmpType = false;
      bottomText = allAmount;
    }

    if (type) {
      tmpType = false;
      bottomText = '余额:' + division(item.balance, ratio, 4);
      if (item.flag) {
        typeText = '转入';
        amount = '+' + amount;
        textColor = Colors.colorA2;
      } else {
        typeText = '转出';
        amount = '-' + amount;
        textColor = Colors.colorA3;
      }
    } else {
      if (item.changeType === 1 || item.changeType === 2) {
        tmpType = false;
      }
    }

    const styleRight = type ? 'item__top-right1' : 'item__top-right';
    const midColorStyle = `color:${textColor}`;

    return (
      <View className='item'>
        <View className='item__top'>
          <View className='item__top-left'>
            <Text className='item__top-left-text'>{leftTopText}</Text>
            <View className='item__top-left-view'>
              <Text className='item__top-left-view-text'>{leftBottomText}</Text>
            </View>
          </View>
          <View className='item__top-mid'>
            <Text className='item__top-mid-text'>{code}</Text>
            <Text className='item__top-mid-text' style={midColorStyle}>
              {typeText}
            </Text>
          </View>
          <View className={styleRight}>
            <Text className='item__top-right-text' style={midColorStyle}>
              {amount}
            </Text>
            {tmpType && <Text className='item__top-right-text'>{bottomText}</Text>}
            <Text className='item__top-right-text'>{allAmount}</Text>
          </View>
        </View>
        <View className='item__div' />
      </View>
    );
  }
}
