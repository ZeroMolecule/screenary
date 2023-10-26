const { composePlugins, withNx } = require('@nx/webpack');
const WebpackPlugin = require('@sentry/webpack-plugin');

module.exports = composePlugins(withNx(), (config) => {
  config.devtool = 'source-map';
  config.plugins.push(
    new WebpackPlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_API_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })
  );
  return config;
});
