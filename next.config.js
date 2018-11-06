const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    );
    return config;
  },
  serverRuntimeConfig: { // Will only be available on the server side
    privateIdentityKey: Buffer.from('3d77b86e0bf3d822d477c6fd2071a5a8488a1a63c46088d9e93e61fa0e2575bf', 'hex'),
    credentialRequirements: {
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
    },
  },
  publicRuntimeConfig: { // Will be available on both server and client
    BASE_URL: 'https://avalon.jolocom.com',
  },
};
