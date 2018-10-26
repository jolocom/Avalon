const { JolocomLib } = require('jolocom-lib');

const validateCredentialSignatures = async credentialResponse => {
  const suppliedCredentials = credentialResponse.getSuppliedCredentials();
  const registry = JolocomLib.registry.jolocom.create();
  console.log({ suppliedCredentials });
  const credSignatureValidity = await Promise.all(suppliedCredentials.map(cred => registry.validateSignature(cred)));

  if (!credSignatureValidity.every(entry => entry)) {
    throw new Error('Invalid signature on presented credentials');
  }

  return true;
};

const extractDataFromClaims = credentialResponse => {
  let response = {
    givenName: '',
    familyName: '',
  };

  credentialResponse.getSuppliedCredentials().forEach(credential => {
    const claim = credential.getCredentialSection();
    response = { ...response, ...claim };
  });

  return response;
};

module.exports = {
  validateCredentialSignatures,
  extractDataFromClaims,
};
