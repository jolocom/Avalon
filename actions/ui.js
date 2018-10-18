import * as ACTIONS from './';

export const setAboutOverlayState = state => {
  return {
    type: ACTIONS.SET_ABOUT_OVERLAY_STATE,
    payload: state,
  };
};
