const { credentialRequirements } = require('../config');
const { validateCredentialSignatures, extractDataFromClaims } = require('../utils');
const { JSONWebToken } = require('jolocom-lib/js/interactionFlows/JSONWebToken');
const { CredentialRequest } = require('jolocom-lib/js/interactionFlows/credentialRequest/credentialRequest');

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
        credentialRequirements,
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
};

module.exports = {
  configureRoutes,
};
