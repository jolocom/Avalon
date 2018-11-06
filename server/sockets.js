const io = require('socket.io');
const { SSO } = require('jolocom-lib/js/sso/index');
const { InteractionType } = require('jolocom-lib/js/interactionFlows/types');

const configureSockets = (
  server,
  identityWallet,
  dbWatcher,
  redisApi,
) => {
  const getConfig = require('next/config').default;
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
  const { getAsync, setAsync, delAsync } = redisApi;
  const baseSocket = io(server).origins('*:*');

  const ssoSocket = {
    qrCode: baseSocket.of('/sso/qr-code'),
    status: baseSocket.of('/sso/status'),
  };
  const residencySocket = {
    qrCode: baseSocket.of('/residency/qr-code'),
    status: baseSocket.of('/residency/status'),
  };
  const drivingLicenceSocket = {
    qrCode: baseSocket.of('/driving-licence/qr-code'),
    status: baseSocket.of('/driving-licence/status'),
  };

  ssoSocket.qrCode.on('connection', async socket => {
    const { identifier } = socket.handshake.query;
    const callbackURL = `${publicRuntimeConfig.BASE_URL}/authentication/${identifier}`;

    const credentialRequest = await identityWallet.create.credentialRequestJSONWebToken({
      typ: InteractionType.CredentialRequest,
      credentialRequest: {
        callbackURL,
        credentialRequirements: [
          serverRuntimeConfig.credentialRequirements.name,
        ],
      },
    });

    const qrCode = await new SSO().JWTtoQR(credentialRequest.encode());
    socket.emit(identifier, qrCode);
  });

  ssoSocket.status.on('connection', async socket => {
    const { identifier } = socket.handshake.query;
    dbWatcher.addSubscription(identifier);
    dbWatcher.on(identifier, async() => {
      const userData = await getAsync(identifier);
      socket.emit(identifier, userData);
    });
  });

  residencySocket.qrCode.on('connection', async socket => {
    try {
      const { user, identifier } = socket.handshake.query;
      await setAsync(JSON.parse(user).id, user);
      const callbackURL = `${publicRuntimeConfig.BASE_URL}/receive/residency`;

      const credOffer = await identityWallet.create.credentialOfferRequestJSONWebToken({
        typ: InteractionType.CredentialOfferRequest,
        credentialOffer: {
          instant: true,
          challenge: identifier,
          requestedInput: {},
          callbackURL: callbackURL,
        },
      });
      const credentialReceiveJWT = credOffer.encode();

      const qrCode = await new SSO().JWTtoQR(credentialReceiveJWT);
      socket.emit(identifier, qrCode);
    } catch (error) {
      console.log(error);
    }
  });

  residencySocket.status.on('connection', async socket => {
    const { identifier } = socket.handshake.query;
    dbWatcher.addSubscription(identifier);
    dbWatcher.on(identifier, async() => {
      const userData = await getAsync(identifier);
      await delAsync(identifier);
      socket.emit(identifier, userData);
    });
  });

  drivingLicenceSocket.qrCode.on('connection', async socket => {
    try {
      const { user, identifier } = socket.handshake.query;
      await setAsync(JSON.parse(user).id, user);
      const callbackURL = `${publicRuntimeConfig.BASE_URL}/receive/driving`;

      const credOffer = await identityWallet.create.credentialOfferRequestJSONWebToken({
        typ: InteractionType.CredentialOfferRequest,
        credentialOffer: {
          instant: true,
          challenge: identifier,
          requestedInput: {},
          callbackURL: callbackURL,
        },
      });

      const credentialReceiveJWT = credOffer.encode();

      const qrCode = await new SSO().JWTtoQR(credentialReceiveJWT);
      socket.emit(identifier, qrCode);
    } catch (error) {
      console.log(error);
    }
  });

  drivingLicenceSocket.status.on('connection', async socket => {
    const { identifier } = socket.handshake.query;
    dbWatcher.addSubscription(identifier);
    dbWatcher.on(identifier, async() => {
      const userData = await getAsync(identifier);
      await delAsync(identifier);
      socket.emit(identifier, userData);
    });
  });
};


module.exports = {
  configureSockets,
};
