import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { onBbLog } from '../../services';
// 查看BB日志列表
export const onBbLogList = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await onBbLog.onBbLogList(reqParam);
    console.log('onBbLogList=', result, reqParam);
    return dispatch(createAction(types.CHECK_BB_LOG, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.CHECK_BB_LOG, exceptionPayload));
  }
};
