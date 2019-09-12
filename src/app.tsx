import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import configStore from './redux/store';

import Index from './containers/home/main/index';
import './app.scss';
import WebSocket from './services/websocket';
// import { sendWrapper } from './utils/websocket-util';
import AppConfig from './const/config';
import * as types from './redux/action-types';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'containers/home/main/index',
      'containers/markets/main/index',
      'containers/exchange/index',
      'containers/assets/index',
      'containers/login-register/login/login',
      'containers/login-register/register/register',
      'containers/login-register/forget-password/change-password',
      'containers/login-register/capital-pwinit/capital-init',
      'containers/assets/account-detail/index',
      'components/choose-coin/index',
      'containers/login-register/internationalization/index',
      'containers/assets/assets-opengoogleauth/google-authopen',
      'containers/assets/assets-closedgooleauth/google-authclosed',
      'containers/assets/assets-recharge-fund-pwd/recharge-fund-pwd',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '币币交易小程序',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    },
    tabBar: {
      color: '#626567',
      selectedColor: '#2A8CE5',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'containers/home/main/index',
          text: '首页',
          iconPath: './assets/images/tab/icon_home_2.png',
          selectedIconPath: './assets/images/tab/icon_home.png',
        },
        {
          pagePath: 'containers/markets/main/index',
          text: '行情',
          iconPath: './assets/images/tab/icon_market_2.png',
          selectedIconPath: './assets/images/tab/icon_market.png',
        },
        {
          pagePath: 'containers/exchange/index',
          text: '交易',
          iconPath: './assets/images/tab/icon_trading_2.png',
          selectedIconPath: './assets/images/tab/icon_trading.png',
        },
        {
          pagePath: 'containers/assets/index',
          text: '资产',
          iconPath: './assets/images/tab/icon_assets_2.png',
          selectedIconPath: './assets/images/tab/icon_assets.png',
        },
      ],
    },
  };

  componentWillMount() {}

  componentDidMount() {
    AppConfig.headers.deviceid = Taro.getStorageSync('deviceid');
    if (!AppConfig.headers.deviceid) {
      AppConfig.headers.deviceid = `${+new Date()}`;
      Taro.setStorageSync('deviceid', AppConfig.headers.deviceid);
    }
    store.dispatch({ type: types.CHANGE_DEVICE_ID, payload: AppConfig.headers.deviceid });

    WebSocket.getInstance().connect();

    Taro.getStorage({ key: 'token' })
      .then(res => (AppConfig.headers.token = res.data))
      .catch(() => {
        AppConfig.headers.token = '';
      });
    Taro.getStorage({ key: 'uid' })
      .then(res => (AppConfig.headers.uid = res.data))
      .catch(() => {
        AppConfig.headers.uid = '';
      });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {
    WebSocket.getInstance().close();
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
