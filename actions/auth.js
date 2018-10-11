import * as ACTIONS from './';
import io from 'socket.io-client';
import { serviceUrl } from '../config';

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
  const randomId = randomString(5);
  const qrCode = await getQrCode(randomId);

  dispatch(setQRCode(qrCode));
  cb();

  const data = await awaitUserData(randomId);

  dispatch(setUserData(JSON.parse(data)));
};

const getQrCode = async randomId => {
  const socket = io(`${serviceUrl}/qr-code`, { query: { userId: randomId } });
  return new Promise(resolve => {
    socket.on(randomId, qrCode => resolve(qrCode));
  });
};

export const awaitUserData = async randomId=> {
  const socket = io(`${serviceUrl}/sso-status`, {
    query: { userId: randomId },
  });

  return new Promise(resolve => {
    socket.on(randomId, data => resolve(data));
  });
};

const randomString = length => {
  return Math.random()
    .toString(36)
    .substr(2, length);
};
