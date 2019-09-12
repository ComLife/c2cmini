export type PageOwnProps = {
  coinWallet: any;
  currency: any;
  cloudWallet: any;
  coinWalletTotalPrice: number;
  coinWalletTotalRMBPrice: number;
  cloudWalletTotalPrice: number;
  cloudWalletTotalRMBPrice: number;
  currencyDeful: any;
  CloudWalletAssets: any;
  ReceiveaddressData: any;
  currencyDefaultData: any;
  coinTotalPrice: any;
  coinTotalRMBPrice: any;
  userInfoData: Record<string, any>;
  addAssetsSearch: any;
};

export type PageDispatchProps = {
  onViewWalletRequest: () => void;
  onCloudWalletAssetsRequest: () => void;
  onCloudWalletTypeRequest: () => void;
  onSetCurreyDefault: () => void;
  onAddAssetsSearch: () => void;
  onRemoveAssetsSearch: () => void;
  dispatch: Function;
};

export type PageStateProps = {
  counter: {
    num: number;
  };
  language: string;
  deviceId: string;
  marketInfoData: Record<string, any>;
  //
  userInfo: Record<string, any>;
  getViewWallet: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletAssets: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
  addAssetsSearch: {
    data: any;
  };
  ReceiveaddressData: {
    code: string;
  };
  currencyDefaultData: any;
};
