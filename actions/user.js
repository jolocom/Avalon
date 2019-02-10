import * as ACTIONS from './';
import { randomString } from 'utils';
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
    const user = getState().userData;

    const { qrCode, socket, identifier } = await getQrCode('receive', {
      credentialType: 'driving-license',
      data: JSON.stringify({ ...user, nationality: 'avalonier' }),
    });

    dispatch(setQRCode(qrCode));
    cb();

    const data = await awaitStatus({ socket, identifier });
    const dataJson = JSON.parse(data);

    if (dataJson.status === 'success') {
      dispatch(updateUserData({
        residency: true,
      }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDrivingLicence = (params, cb) => async(dispatch, getState) => {
  try {
    const user = getState().userData;

    const { qrCode, socket, identifier } = await getQrCode('receive', {
      credentialType: 'driving-license',
      data: JSON.stringify(user),
    });

    dispatch(setQRCode(qrCode));
    cb();

    const data = await awaitStatus({ socket, identifier });
    const dataJson = JSON.parse(data);

    if (dataJson.status === 'success') {
      dispatch(updateUserData({
        drivingLicence: true,
      }));
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
