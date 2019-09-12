export interface Props {
  getCloudWalletTypeCode: any;
  getAllCloudWalletTypeCode: any;
  getLogList: any;
  logCode: string;
  getTotalPage: number;
  logMsg: string;
  getLogRuleList: any;
  getRuleTotalPage: number;
}

export interface DispatchProps {
  onCloudWalletTypeRequest: Function;
  onAllCloudWalletTypeRequest: Function;
  onBbLogList: Function;
  onRuleLogList: Function;
  dispatch: Function;
  resetState: Function;
}

export interface StateProps {
  getAllCloudWalletType: {
    data?: {};
  };

  getCloudWalletType: {
    data?: {};
  };
  getRuleLog: {
    msg?: string;
    code?: string;
    data?: { dataList?: any; totalPageCount?: number };
  };
  chenkBbLog: {
    msg?: string;
    code?: string;
    data?: { dataList?: any; totalPageCount?: number };
  };
  chenkRuleLog: {};
}
