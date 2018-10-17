import io from 'socket.io-client';
import { serviceUrl } from '../config';

export const getQrCode = async({ socketName, query }) => {
  const socket = io(`${serviceUrl}/${socketName}/qr-code`, { query });

  return new Promise(resolve => {
    socket.on(query.identifier, qrCode => resolve(qrCode));
  });
};

export const awaitStatus = async({ socketName, identifier }) => {
  const socket = io(`${serviceUrl}/${socketName}/status`, {
    query: { identifier },
  });

  return new Promise(resolve => {
    socket.on(identifier, data => resolve(data));
  });
};
