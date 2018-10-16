const { JolocomLib } = require('jolocom-lib');
const { JSONWebToken } = require('jolocom-lib/js/interactionFlows/JSONWebToken');
const { CredentialRequest } = require('jolocom-lib/js/interactionFlows/credentialRequest/credentialRequest');

const { credentialRequirements, privateIdentityKey } = require('../config');
const { validateCredentialSignatures, extractDataFromClaims } = require('./utils');

const configureRoutes = async(app, redisApi) => {
  const { setAsync } = redisApi;

  app.post('/authentication/:clientId', async(req, res, next) => {
    const { clientId } = req.params;
    const { token } = req.body;

    try {
      const { credentialResponse } = await JSONWebToken.decode(token);

      await validateCredentialSignatures(credentialResponse);

      const credentialRequest = CredentialRequest.create({
        callbackURL: '',
        credentialRequirements: [
          credentialRequirements.email,
          credentialRequirements.name,
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

      await setAsync(clientId, JSON.stringify({ status: 'success', data: userData }));

      res.json('OK');
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.post('/residency', async(req, res, next) => {
    const { jwt } = req.body;

    try {
      const registry = JolocomLib.registry.jolocom.create();
      await registry.authenticate(privateIdentityKey);
      const credReceive = await JSONWebToken.decode(jwt);
      const providedCredentials = credReceive.getSignedCredentials();
      const validCredSignature = await registry.validateSignature(providedCredentials[0]);

      if (!validCredSignature) {
        throw new Error('Credentials signature is not valid');
      }
      await setAsync(providedCredentials[0].claim.id, JSON.stringify({ status: 'success', data: validCredSignature }));

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
