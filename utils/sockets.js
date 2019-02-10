import io from 'socket.io-client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const getQrCode = (socketName, query) => {
  const socket = io(`${publicRuntimeConfig.backendUrl}/${socketName}/`, { forceNew: true, query });
  return new Promise(resolve => socket.on('qrCode', ({ qrCode, identifier }) => resolve({ qrCode, socket, identifier })));
};

export const awaitStatus = ({ socket, identifier }) => {
  return new Promise((resolve, reject) => {
    socket.on(identifier, data => {
      const parsedData = JSON.parse(data);
      if (parsedData.status === 'failure') {
        reject(parsedData);
      } else {
        resolve(parsedData);
      }
    });
  });
};
