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
  bannerFetching: boolean;
  bannerData: Record<string, any>[];
  getAllCloudWalletTypeCode: any;
  increaseList: Record<string, any>[];
};

export type PageDispatchProps = {
  onBannerRequest: () => void;
  onViewWalletRequest: () => void;
  onCloudWalletAssetsRequest: () => void;
  onAllCloudWalletTypeRequest: Function;
  onCloudWalletTypeRequest: () => void;
  onSetCurreyDefault: () => void;
  dispatch: (data) => void;
};

export type PageStateProps = {
  counter: {
    num: number;
  };
  getAllCloudWalletType: {
    data?: {};
  };
  // language: string;
  // deviceId: string;
  // marketInfoData: Record<string, any>;
  // //
  // userInfo: Record<string, any>;
  // getViewWallet: {
  //   msg: any;
  //   code: string;
  //   data: any;
  // };
  // getCloudWalletAssets: {
  //   msg: any;
  //   code: string;
  //   data: any;
  // };
  // getCloudWalletType: {
  //   msg: any;
  //   code: string;
  //   data: any;
  // };
  // ReceiveaddressData: {
  //   code: string;
  // };
  // currencyDefaultData: any;
};
