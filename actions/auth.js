import * as ACTIONS from './';
import { randomString } from 'utils';
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
  const identifier = randomString(5);
  const qrCode = await getQrCode({
    socketName: 'sso',
    query: {
      identifier,
    },
  });

  dispatch(setQRCode(qrCode));
  cb();

  const data = await awaitStatus({
    socketName: 'sso',
    identifier,
  });

  dispatch(setUserData(JSON.parse(data)));
};
