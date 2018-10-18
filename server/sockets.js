const io = require('socket.io');
const { SSO } = require('jolocom-lib/js/sso/index');
const { InteractionType } = require('jolocom-lib/js/interactionFlows/types');
const { claimsMetadata } = require('cred-types-jolocom-demo');

const configureSockets = (
  server,
  identityWallet,
  dbWatcher,
  redisApi,
) => {
  const getConfig = require('next/config').default;
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
  const { getAsync, delAsync } = redisApi;
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
          serverRuntimeConfig.credentialRequirements.email,
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
      await delAsync(identifier);
      socket.emit(identifier, userData);
    });
  });

  residencySocket.qrCode.on('connection', async socket => {
    try {
      const { user, identifier } = socket.handshake.query;
      const residencySignedCredential = await identityWallet.create.signedCredential({
        metadata: claimsMetadata.demoId,
        claim: { ...user, identifier },
        subject: user.id,
      });

      const credReceiveJWTClass = identityWallet.create.credentialsReceiveJSONWebToken({
        typ: InteractionType.CredentialsReceive,
        credentialsReceive: {
          signedCredentials: [residencySignedCredential],
        },
      });

      const credentialReceiveJWT = credReceiveJWTClass.encode();

      console.log(credentialReceiveJWT);

      const qrCode = await new SSO()
        .JWTtoQR(credentialReceiveJWT, { errorCorrectionLevel: 'L', version: 40 });
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
      const {
        user: {
          givenName,
          familyName,
          birthDate,
          birthPlace,
        },
        identifier,
      } = socket.handshake.query;
      const signedCredential = await identityWallet.create.signedCredential({
        metadata: claimsMetadata.demoDriversLicence,
        claim: { givenName, familyName, birthDate, birthPlace, identifier },
      });

      const credReceiveJWTClass = identityWallet.create.credentialsReceiveJSONWebToken({
        typ: InteractionType.CredentialsReceive,
        credentialsReceive: {
          signedCredentials: [signedCredential],
        },
      });

      const credentialReceiveJWT = credReceiveJWTClass.encode();

      console.log(credentialReceiveJWT);

      const qrCode = await new SSO()
        .JWTtoQR(credentialReceiveJWT, { errorCorrectionLevel: 'L', version: 40 });

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
