export const homemainindex = {
  note: '首页Tab页',
  url: '/containers/home/main/index',
};
export const exchangeindex = {
  note: '交易Tab页',
  url: '/containers/exchange/index',
};
export const loginregisterloginlogin = {
  note: '登录页',
  url: '/containers/login-register/login/login',
};
export const loginregisterregisterregister = {
  note: '注册页',
  url: '/containers/login-register/register/register',
};
export const loginregistercapitalpwinitcapitalinit = {
  note: '初始化资金密码',
  url: '/containers/login-register/capital-pwinit/capital-init',
};
export const loginregisterforgetpasswordchangepassword = {
  note: '忘记密码-修改密码',
  url: '/containers/login-register/forget-password/change-password',
};
export const internationalization = {
  note: '国际化',
  url: '/containers/login-register/internationalization/index',
};
export const assetsaccountdetailindex = (data: string) => {
  return {
    note: '帐单明细',
    url: `/containers/assets/account-detail/index${data}`,
  };
};
