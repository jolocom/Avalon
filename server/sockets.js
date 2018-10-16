const { SSO } = require('jolocom-lib/js/sso/index');
const io = require('socket.io');
const { credentialRequirements, serviceUrl } = require('../config');
const { InteractionType } = require('jolocom-lib/js/interactionFlows/types');
const { claimsMetadata } = require('cred-types-jolocom-demo');

const configureSockets = (
  server,
  identityWallet,
  dbWatcher,
  redisApi,
) => {
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

  ssoSocket.qrCode.on('connection', async socket => {
    const { userId } = socket.handshake.query;
    const callbackURL = `${serviceUrl}/authentication/${userId}`;

    const credentialRequest = await identityWallet.create.credentialRequestJSONWebToken({
      typ: InteractionType.CredentialRequest,
      credentialRequest: {
        callbackURL,
        credentialRequirements: [
          credentialRequirements.email,
          credentialRequirements.name,
        ],
      },
    });

    const qrCode = await new SSO().JWTtoQR(credentialRequest.encode());
    socket.emit(userId, qrCode);
  });

  ssoSocket.status.on('connection', async socket => {
    const { userId } = socket.handshake.query;
    dbWatcher.addSubscription(userId);
    dbWatcher.on(userId, async() => {
      const userData = await getAsync(userId);
      await delAsync(userId);
      socket.emit(userId, userData);
    });
  });

  residencySocket.qrCode.on('connection', async socket => {
    try {
      const {
        givenName, familyName,
        birthDate, birthPlace,
        nationality = 'lindberger',
        identifier,
        id,
      } = socket.handshake.query;
      const residencySignedCredential = await identityWallet.create.signedCredential({
        metadata: claimsMetadata.demoId,
        claim: { givenName, familyName, birthDate, birthPlace, nationality, identifier },
        subject: id,
      });

      const credReceiveJWTClass = identityWallet.create.credentialsReceiveJSONWebToken({
        typ: InteractionType.CredentialsReceive,
        credentialsReceive: {
          signedCredentials: [residencySignedCredential],
        },
      });

      const credentialReceiveJWT = credReceiveJWTClass.encode();

      console.log(credentialReceiveJWT);

      const qrCode = await new SSO().JWTtoQR(credentialReceiveJWT);

      socket.emit(id, qrCode);
    } catch (error) {
      console.log(error);
    }
  });

  residencySocket.status.on('connection', async socket => {
    const { userDid } = socket.handshake.query;
    dbWatcher.addSubscription(userDid);
    dbWatcher.on(userDid, async() => {
      const userData = await getAsync(userDid);
      await delAsync(userDid);
      socket.emit(userDid, userData);
    });
  });
};

module.exports = {
  configureSockets,
};
