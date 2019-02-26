import * as ACTIONS from './';
import { getQrCode, awaitStatus } from 'utils/sockets';

export const setQRCode = encodedImage => {
  return {
    type: ACTIONS.QR_CODE_SET,
    value: encodedImage,
  };
};

export const setUserData = data => {
  return {
    type: ACTIONS.USER_DATA_SET,
    value: data,
  };
};

export const initiateLogin = cb => async dispatch => {
  const { qrCode, socket, identifier } = await getQrCode('authenticate');
  dispatch(setQRCode(qrCode));
  cb();

  const data = await awaitStatus({ socket, identifier });
  dispatch(setUserData(data));
};
