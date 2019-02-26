const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack: config => {
    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['_app.js']) {
        entries['_app.js'].unshift('./utils/polyfills.js');
      }
      return entries;
    }
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    );
    return config;
  },
  publicRuntimeConfig: { // Will be available on both server and client
    backendUrl: 'http://192.168.2.109:9000',
  },
};
