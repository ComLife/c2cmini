import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { onRuleLog } from '../../services';
// 查看BB日志列表
export const onRuleLogList = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await onRuleLog.onRuleLogList(reqParam);
    console.log('onRuleLogList=', result, reqParam);
    return dispatch(createAction(types.CHECK_RULE_LOG, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.CHECK_RULE_LOG, exceptionPayload));
  }
};
