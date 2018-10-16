import io from 'socket.io-client';
import * as ACTIONS from './';
import { serviceUrl } from '../config';
import { randomString } from 'utils';

export const setQRCode = encodedImage => {
  return {
    type: ACTIONS.QR_CODE_SET,
    value: encodedImage,
  };
};

export const initiateResidency = (params, cb) => async(dispatch, getState) => {
  try {
    const identifier = randomString(5);
    const user = getState().userData;
    const qrCode = await getQrCode({
      ...params,
      ...user,
      identifier,
    });

    dispatch(setQRCode(qrCode));
    cb();

    const data = await awaitResidencyAccess(user.id);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getQrCode = async params => {
  const socket = io(`${serviceUrl}/residency/qr-code`, { query: params });

  return new Promise(resolve => {
    socket.on(params.id, qrCode => resolve(qrCode));
  });
};

export const awaitResidencyAccess = async userId => {
  const socket = io(`${serviceUrl}/residency/status`, {
    query: { userDid: userId },
  });

  return new Promise(resolve => {
    socket.on(userId, data => resolve(data));
  });
};
