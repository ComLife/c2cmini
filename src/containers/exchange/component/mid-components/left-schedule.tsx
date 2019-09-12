import Taro, { Component } from '@tarojs/taro';
import { Slider, Text, View } from '@tarojs/components';
import './left-schedule.scss';
import Color from '../../../../const/ui-color';

export class LeftSchedule extends Component<any, any> {
  static defaultProps = {
    titleText: '限价',
    color: Color.color_a2,
  };

  constructor(props) {
    super(props);
    this.state = {
      tmpValue: 0,
    };
  }

  onText = (value: number) => () => {
    this.setState({ tmpValue: value });
  };

  render() {
    const { color, onChange, onChanging } = this.props;
    const { tmpValue } = this.state;
    return (
      <View className='left-schedule'>
        <View className='left-schedule__view'>
          <Slider
            min={0}
            max={100}
            step={1}
            blockSize={17}
            activeColor={color}
            blockColor={color}
            onChange={onChange}
            onChanging={onChanging}
            value={tmpValue}
          />
        </View>
        <View className='left-schedule__view1'>
          <Text className='left-schedule__view1-text' onClick={this.onText(0)}>
            0%
          </Text>
          <Text className='left-schedule__view1-text' onClick={this.onText(25)}>
            25%
          </Text>
          <Text className='left-schedule__view1-text' onClick={this.onText(50)}>
            50%
          </Text>
          <Text className='left-schedule__view1-text' onClick={this.onText(75)}>
            75%
          </Text>
          <Text className='left-schedule__view1-text' onClick={this.onText(100)}>
            100%
          </Text>
        </View>
      </View>
    );
  }
}

export default LeftSchedule;
