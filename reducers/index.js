import * as ACTIONS from 'actions';

export const defaultState = {
  userData: {
    did: '',
    email: '',
    givenName: '',
    familyName: '',
    residence: '',
    postalCode: '',
  },
  qrCode: '',
  ui: {
    showAboutOverlay: false,
  },
};

export function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case ACTIONS.USER_DATA_SET:
      return { ...state, userData: { ...action.value.data } };
    case ACTIONS.USER_DATA_PATCH:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    case ACTIONS.QR_CODE_SET:
      return { ...state, qrCode: action.value };
    case ACTIONS.SET_ABOUT_OVERLAY_STATE:
      return {
        ...state,
        ui: {
          ...state.ui,
          showAboutOverlay: action.payload,
        },
      };
    default:
      return state;
  }
}
