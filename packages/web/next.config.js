require('dotenv').config();
const { composePlugins, withNx } = require('@nx/next');
const withNextIntl = require('next-intl/plugin')();
const { withSentryConfig } = require('@sentry/nextjs');

if (process.env.APP_ENV === 'production') {
  process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL =
    'https://screenary-api-e92c7280adc2.herokuapp.com/api';
}

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com' }],
  },
  sassOptions: {
    prependData: '@import "./_mantine.scss";',
  },
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },
};

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_WEB_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
};
const withSentry = (config) =>
  withSentryConfig(config, sentryWebpackPluginOptions);

const plugins = [withNx, withNextIntl, withSentry];

module.exports = composePlugins(...plugins)(nextConfig);
