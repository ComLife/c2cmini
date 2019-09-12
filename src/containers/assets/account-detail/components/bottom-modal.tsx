import Taro, { Component } from '@tarojs/taro';
import { Text } from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui';
import './bottom-modal.scss';

export class BottomModal extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  renderShowMap = data => {
    // const textStyle = this.backStyle(true);
    return data.map((item: any, index: number) => (
      <AtActionSheetItem key={index} onClick={item.onItem(index)}>
        <Text className='bottom-modal__text' style={`color:${item.color}`}>
          {item.text}
        </Text>
      </AtActionSheetItem>
    ));
  };

  render() {
    const { isOpenDate, isOpenCion, isOpenType, dateData, cionData, typeData, onClose } = this.props;
    const isOpen = isOpenDate || isOpenCion || isOpenType;
    return (
      <AtActionSheet isOpened={isOpen} onClose={onClose}>
        {isOpenDate && this.renderShowMap(dateData)}
        {isOpenCion && this.renderShowMap(cionData)}
        {isOpenType && this.renderShowMap(typeData)}
      </AtActionSheet>
    );
  }
}

export default BottomModal;
