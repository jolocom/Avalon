import io from 'socket.io-client';
import { serviceUrl } from '../config';

export const getQrCode = ({ socketName, query }) => {
  const socket = io(`${serviceUrl}/${socketName}/qr-code`, { query, forceNew: true });

  return new Promise(resolve => {
    socket.on(query.identifier, qrCode => resolve(qrCode));
  });
};

export const awaitStatus = ({ socketName, identifier }) => {
  const socket = io(`${serviceUrl}/${socketName}/status`, {
    query: { identifier },
    forceNew: true,
  });

  return new Promise(resolve => {
    socket.on(identifier, data => resolve(data));
  });
};
