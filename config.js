// Private key associated with the service's identity
const privateIdentityKey = Buffer.from('3d77b86e0bf3d822d477c6fd2071a5a8488a1a63c46088d9e93e61fa0e2575bf', 'hex');

// Where is your service deployed. E.g. https://demo-sso.jolocom.com
const serviceUrl = 'http://localhost:3000';

// What credentials do you require during authentication, and associated constraints
const credentialRequirements = [
  {
    type: ['Credential', 'ProofOfEmailCredential'],
    constraints: [{ '==': [true, true] }],
  },
  {
    type: ['Credential', 'ProofOfNameCredential'],
    constraints: [{ '==': [true, true] }],
  },
];

module.exports = {
  privateIdentityKey,
  serviceUrl,
  credentialRequirements,
};
