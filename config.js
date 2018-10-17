// Private key associated with the service's identity
const privateIdentityKey = Buffer.from('3d77b86e0bf3d822d477c6fd2071a5a8488a1a63c46088d9e93e61fa0e2575bf', 'hex');

// Where is your service deployed. E.g. https://jolocom.herokuapp.com/
const serviceUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000';

const credentialRequirements = {
  email: {
    type: ['Credential', 'ProofOfEmailCredential'],
    constraints: [{ '==': [true, true] }],
  },
  name: {
    type: ['Credential', 'ProofOfNameCredential'],
    constraints: [{ '==': [true, true] }],
  },
  residency: {
    type: ['Credential', 'ProofOfDemoIdCredential'],
    constraints: [{ '==': [true, true] }],
  },
  drivingLicense: {
    type: ['Credential', 'ProofOfDemoDriversLicenceCredential'],
    constraints: [{ '==': [true, true] }],
  },
};

module.exports = {
  privateIdentityKey,
  serviceUrl,
  credentialRequirements,
};
