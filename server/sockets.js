const { SSO } = require('jolocom-lib/js/sso/index');
const io = require('socket.io');
const { credentialRequirements, serviceUrl } = require('../config');
const { InteractionType } = require('jolocom-lib/js/interactionFlows/types');

const configureSockets = (
  server,
  identityWallet,
  dbWatcher,
  redisApi,
) => {
  const { getAsync, delAsync } = redisApi;

  const baseSocket = io(server).origins('*:*');

  const qrCodeSocket = baseSocket.of('/qr-code');
  const dataSocket = baseSocket.of('/sso-status');

  qrCodeSocket.on('connection', async socket => {
    const { userId } = socket.handshake.query;
    console.log('connected');

    const callbackURL = `${serviceUrl}/authentication/${userId}`;

    const credentialRequest = await identityWallet.create.credentialRequestJSONWebToken({
      typ: InteractionType.CredentialRequest,
      credentialRequest: {
        callbackURL,
        credentialRequirements,
      },
    });

    const qrCode = await new SSO().JWTtoQR(credentialRequest.encode());
    socket.emit(userId, qrCode);
  });

  dataSocket.on('connection', async socket => {
    const { userId } = socket.handshake.query;
    dbWatcher.addSubscription(userId);
    dbWatcher.on(userId, async() => {
      const userData = await getAsync(userId);
      await delAsync(userId);
      socket.emit(userId, userData);
    });
  });
};

module.exports = {
  configureSockets,
};
