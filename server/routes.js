const { JolocomLib } = require('jolocom-lib');
const { JSONWebToken } = require('jolocom-lib/js/interactionFlows/JSONWebToken');
const { CredentialRequest } = require('jolocom-lib/js/interactionFlows/credentialRequest/credentialRequest');
const { claimsMetadata } = require('cred-types-jolocom-demo');

const { validateCredentialSignatures, extractDataFromClaims } = require('./utils');

const configureRoutes = async(app, redisApi, iw) => {
  const { setAsync, delAsync, getAsync } = redisApi;
  const getConfig = require('next/config').default;
  const { serverRuntimeConfig } = getConfig();

  app.post('/receive/:type', async(req, res) => {
    const { token } = req.body;
    const { type } = req.params;
    const { iss } = await JolocomLib.parse.interactionJSONWebToken.decode(token);
    const did = iss.substring(0, iss.indexOf('#'));

    const metadataMap = {
      residency: claimsMetadata.demoId,
      driving: claimsMetadata.demoDriversLicence,
    };

    const user = await getAsync(did);
    await delAsync(did);
    const parsed = JSON.parse(user);
    const filtered = Object.keys(parsed).filter(key => key !== 'status');

    const residencySignedCredential = await iw.create.signedCredential({
      metadata: metadataMap[type],
      claim: filtered.reduce((acc, curr) => ({ ...acc, [curr]: parsed[curr] }), {}),
      subject: did,
    });

    const encodedCredential = await iw.create
      .credentialsReceiveJSONWebToken({
        iss: iw.getIdentity().getDID(),
        typ: 'credentialsReceive',
        credentialsReceive: {
          signedCredentials: [residencySignedCredential.toJSON()]
        },
      })
      .encode();

    res.json({ token: encodedCredential });
  });

  app.post('/authentication/:identifier', async(req, res, next) => {
    const { identifier } = req.params;
    const { token } = req.body;

    try {
      const { credentialResponse } = await JSONWebToken.decode(token);

      await validateCredentialSignatures(credentialResponse);

      const credentialRequest = CredentialRequest.create({
        callbackURL: '',
        credentialRequirements: [
          serverRuntimeConfig.credentialRequirements.name,
        ],
      });

      if (!credentialResponse.satisfiesRequest(credentialRequest)) {
        throw new Error('The supplied credentials do not match the types of the requested credentials');
      }

      const userData = {
        ...extractDataFromClaims(credentialResponse),
        did: credentialResponse.issuer,
        status: 'success',
      };

      await setAsync(identifier, JSON.stringify({ status: 'success', data: userData }));

      res.json('OK');
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.post('/get-claim/:identifier', async(req, res, next) => {
    const { identifier } = req.params;
    const { jwt } = req.body;

    try {
      const registry = JolocomLib.registry.jolocom.create();
      await registry.authenticate(serverRuntimeConfig.privateIdentityKey);
      const credReceive = await JSONWebToken.decode(jwt);
      const providedCredentials = credReceive.getSignedCredentials();
      const validCredSignature = await registry.validateSignature(providedCredentials[0]);

      if (!validCredSignature) {
        throw new Error('Credentials signature is not valid');
      }
      await setAsync(identifier, JSON.stringify({ status: 'success', data: validCredSignature }));

      res.json('OK');
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = {
  configureRoutes,
};
