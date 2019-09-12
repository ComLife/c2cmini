import Taro, { Component } from '@tarojs/taro';
import { Text } from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui';
import './index.scss';

export class BottomModal extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  renderShowMap = (data, onBack) => {
    // const textStyle = this.backStyle(true);
    return data.map((item: any, index: number) => (
      <AtActionSheetItem key={index} onClick={onBack(index)}>
        <Text className='bottom-modal__text' style={`color:${item.color}`}>
          {item.text}
        </Text>
      </AtActionSheetItem>
    ));
  };

  render() {
    const { isOpenPrice, isOpenDepth, priceData, depthData, close, onPriceBack, onDepthBack } = this.props;
    const isOpen = isOpenPrice || isOpenDepth;
    return (
      <AtActionSheet isOpened={isOpen} onClose={close}>
        {isOpenPrice && this.renderShowMap(priceData, onPriceBack)}
        {isOpenDepth && this.renderShowMap(depthData, onDepthBack)}
      </AtActionSheet>
    );
  }
}

export default BottomModal;
