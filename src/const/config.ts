/* eslint-disable camelcase */

const Config = {
  isHttps: false,
  isDev: true,
  httpPrefix: 'http://',
  wsPrefix: 'ws://',
  baseUrl: 'api.whlive.top', // 186
  baseBBSUrl: 'bbsapi.test.otcrmbt.com:18001', // 186
  baseAwsUrl: 'whlive.top',
  wsUrl: 'bbsconnect.test.otcrmbt.com:18002/websocket', // 186
  headers: {
    'Content-Type': 'application/json',
    deviceid: '',
    versionId: '1.0.2',
    uid: '',
    token: '',
    securityflag: true,
    sign: '',
    appname: 'c2cMini',
    appsource: '',
    signature: '',
  },
  zendeskUri: 'https://stowhite.zendesk.com',
  versionName: `c2c_mini`,
  bundleId: '',
  encrypt_pwd: '',
  progressEnv: 'test',
  capitalpass: false,
};

export default Config;
