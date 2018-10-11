const { claimsMetadata } = require('cred-types-jolocom-demo');

// Private key associated with the service's identity
const privateIdentityKey = Buffer.from('7A59BC95029803EC082BFEBBA8094F9D6B58AAB1A23B7CA2D9C6B96F21E1A0A4', 'hex');

// Where is your service deployed. E.g. https://demo-sso.jolocom.com
const serviceUrl = 'http://localhost:3000';

// What credentials do you require during authentication, and associated constraints
const credentialRequirements = [
  {
    type: ['Credential', 'ProofOfDemoIdCredential'],
    name: 'Demo Id',
    context: [
      {
        ProofOfDemoIdCredential: 'https://identity.jolocom.com/terms/ProofOfDemoIdCredential',
        schema: 'http://schema.org/',
        familyName: 'schema:familyName',
        givenName: 'schema:givenName',
        birthDate: 'schema:birthPlace',
        birthPlace: 'schema:birthPlace',
        nationality: 'schema:nationality',
        identifier: 'schema:identifier',
      },
    ],
  },
  {
    type: ['Credential', 'ProofOfDemoDriversLicenceCredential'],
    name: 'Demo Drivers Licence',
    context: [
      {
        ProofOfDemoDriversLicenceCredential: 'https://identity.jolocom.com/terms/ProofOfDemoDriversLicenceCredential',
        schema: 'http://schema.org/',
        familyName: 'schema:familyName',
        givenName: 'schema:givenName',
        birthDate: 'schema:birthPlace',
        birthPlace: 'schema:birthPlace',
        identifier: 'schema:identifier',
      },
    ],
  },
];

module.exports = {
  privateIdentityKey,
  serviceUrl,
  credentialRequirements,
};
