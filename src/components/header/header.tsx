import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import ImageSet from '../../const/image-set';
import './header.scss';

class Header extends Component<any, any> {
  static defaultProps = {
    title: '',
    showHeader: true,
    showBackIcon: true,
    handleBack: () => {
      Taro.navigateBack();
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      navBarMarginTop: 0,
    };

    Taro.getSystemInfo({}).then(res => {
      this.setState({ navBarMarginTop: res.statusBarHeight });
    });
  }

  renderStatusBar = () => {
    const { navBarMarginTop } = this.state;
    const colorStyle = `height:${navBarMarginTop}px;background-color:#ffffff`;
    return <View style={colorStyle} />;
  };

  render() {
    return (
      <View>
        {this.renderStatusBar()}
        {this.props.showHeader && (
          <View className='heade-view'>
            {this.props.showBackIcon && (
              <View className='heade-view-back-view' onClick={this.props.handleBack}>
                <Image src={ImageSet.back} className='heade-view-back-view-image' />
              </View>
            )}
            {this.props.title && (
              <View className='heade-view-title-view'>
                <Text>{this.props.title}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Header;
