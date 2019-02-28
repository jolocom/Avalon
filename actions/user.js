import * as ACTIONS from './';
import { getQrCode, awaitStatus } from 'utils/sockets';

export const setQRCode = encodedImage => {
  return {
    type: ACTIONS.QR_CODE_SET,
    value: encodedImage,
  };
};

export const updateUserData = data => {
  return {
    type: ACTIONS.USER_DATA_PATCH,
    payload: data,
  };
};

export const setResidency = (params, cb) => async(dispatch, getState) => {
  try {
    // Quick way to filter out a key. TODO find something eslint friendly
    const { did, status, ...user } = getState().userData;
    const { qrCode, socket, identifier } = await getQrCode('receive', {
      credentialType: 'id-card',
      data: JSON.stringify({ ...user, ...params, nationality: 'avalonier' }),
    });

    dispatch(setQRCode(qrCode));
    cb();

    const data = await awaitStatus({ socket, identifier });

    if (data.status === 'success') {
      dispatch(
        updateUserData({
          residency: true,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDrivingLicence = (params, cb) => async(dispatch, getState) => {
  try {
    const { did, status, ...user } = getState().userData;

    const { qrCode, socket, identifier } = await getQrCode('receive', {
      credentialType: 'driving-license',
      data: JSON.stringify({ ...user, ...params }),
    });

    dispatch(setQRCode(qrCode));
    cb();

    const data = await awaitStatus({ socket, identifier });

    if (data.status === 'success') {
      dispatch(
        updateUserData({
          drivingLicence: true,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};
