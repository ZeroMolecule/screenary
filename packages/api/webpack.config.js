const { composePlugins, withNx } = require('@nx/webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = composePlugins(withNx(), (config) => {
  config.devtool = 'source-map';
  config.plugins.push(
    new SentryWebpackPlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_API_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })
  );
  return config;
});
