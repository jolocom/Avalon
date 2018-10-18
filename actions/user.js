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
  const identifier = randomString(5);
  try {
    const user = getState().userData;
    const qrCode = await getQrCode({
      socketName: 'residency',
      query: {
        user: {
          ...params,
          ...user,
          nationality: 'lindberger',
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
    const dataJson = JSON.parse(data);

    if (dataJson.status === 'success') {
      dispatch(updateUserData({
        residency: true,
      }));
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getDrivingLicence = (params, cb) => async(dispatch, getState) => {
  const identifier = randomString(5);
  try {
    const user = getState().userData;
    const qrCode = await getQrCode({
      socketName: 'driving-licence',
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
      socketName: 'driving-licence',
      identifier,
    });
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

export const initiateMobSSO = cb => async dispatch => {
  const identifier = randomString(5);
  try {
    const qrCode = await getQrCode({
      socketName: 'mob-sso',
      query: {
        identifier,
      },
    });

    dispatch(setQRCode(qrCode));
    cb();

    const data = await awaitStatus({
      socketName: 'mob-sso',
      identifier,
    });
    const dataJson = JSON.parse(data);

    if (dataJson.status === 'success') {
      dispatch(updateUserData({
        mobSigned: true,
      }));
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
