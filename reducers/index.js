import * as ACTIONS from '../actions';

export const defaultState = {
  userData: {
    did: '',
    email: '',
    givenName: '',
    familyName: '',
  },
  qrCode: '',
};

export function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case ACTIONS.USER_DATA_SET:
      return { ...state, userData: { ...action.value.data } };
    case ACTIONS.QR_CODE_SET:
      return { ...state, qrCode: action.value };
    default:
      return state;
  }
}
