export type PageOwnProps = {
  currency: any;
  cloudWallet: any;
  coinWallet: any;
};

export type PageDispatchProps = {
  onCloudWalletTypeRequest: () => void;
  onAddAssetsSearch: () => void;
};

export type PageStateProps = {
  getCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
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
};
