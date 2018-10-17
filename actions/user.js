import * as ACTIONS from './';
import { randomString } from 'utils';
import { getQrCode, awaitStatus } from 'utils/sockets';

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
      socketName: 'residency',
      query: {
        user: {
          ...params,
          ...user,
        },
        identifier,
      },
    });
    dispatch(setQRCode(qrCode));
    cb();

    const data = await awaitStatus({
      socketName: 'residency',
      identifier,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
