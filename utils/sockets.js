import io from 'socket.io-client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();


export const getQrCode = ({ socketName, query }) => {
  const socket = io(`${publicRuntimeConfig.BASE_URL}/${socketName}/qr-code`, { query, forceNew: true });

  return new Promise(resolve => {
    socket.on(query.identifier, qrCode => resolve(qrCode));
  });
};

export const awaitStatus = ({ socketName, identifier }) => {
  const socket = io(`${publicRuntimeConfig.BASE_URL}/${socketName}/status`, {
    query: { identifier },
    forceNew: true,
  });

  return new Promise(resolve => {
    socket.on(identifier, data => resolve(data));
  });
};
