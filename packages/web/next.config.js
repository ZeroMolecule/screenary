const path = require('path');
const { composePlugins, withNx } = require('@nx/next');
const withNextIntl = require('next-intl/plugin')('./i18n.ts');
const withPWAInit = require('next-pwa');
const isDev = process.env.NODE_ENV !== 'production';

const withPWA = withPWAInit({
  disable: isDev,
  dest: 'public',
  exclude: [
    ({ asset }) => {
      if (
        asset.name.startsWith('server/') ||
        asset.name.match(
          /^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/
        ) ||
        (isDev && !asset.name.startsWith('static/runtime/'))
      ) {
        return true;
      }
      return false;
    },
  ],
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  webpack(config) {
    const registerJs = path.join(
      path.dirname(require.resolve('next-pwa')),
      'register.js'
    );
    const entry = config.entry;
    config.entry = () =>
      entry().then((entries) => {
        if (entries['main-app'] && !entries['main-app'].includes(registerJs)) {
          if (Array.isArray(entries['main-app'])) {
            entries['main-app'].unshift(registerJs);
          } else if (typeof entries['main-app'] === 'string') {
            entries['main-app'] = [registerJs, entries['main-app']];
          }
        }
        return entries;
      });
    return config;
  },
};

const plugins = [withNx, withPWA, withNextIntl];

module.exports = composePlugins(...plugins)(nextConfig);
