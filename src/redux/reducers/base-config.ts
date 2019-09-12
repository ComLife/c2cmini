import * as types from '../action-types';

const initialState = { theme: 'white', language: 'cn' };

interface Props {
  type: string;
  payload: {};
}

export function appConfig(state = initialState, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.CHANGE_THEME:
      return { ...state, theme: payload };
    case types.CHANGE_LANGUAGE:
      return { ...state, language: payload };
    case types.CHANGE_INSTALLED:
      return { ...state, isInstalled: payload };
    case types.CHANGE_DEVICE_ID:
      return { ...state, deviceId: payload };
    default:
      return state;
  }
}
