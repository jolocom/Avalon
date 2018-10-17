import io from 'socket.io-client';

export const getQrCode = ({ socketName, query }) => {
  const socket = io(`${process.env.BASE_URL}/${socketName}/qr-code`, { query, forceNew: true });

  return new Promise(resolve => {
    socket.on(query.identifier, qrCode => resolve(qrCode));
  });
};

export const awaitStatus = ({ socketName, identifier }) => {
  const socket = io(`${process.env.BASE_URL}/${socketName}/status`, {
    query: { identifier },
    forceNew: true,
  });

  return new Promise(resolve => {
    socket.on(identifier, data => resolve(data));
  });
};
