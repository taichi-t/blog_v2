/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 * */

const withPrefresh = require('@prefresh/next');
const preact = require('preact');
const path = require('path');
const LINARIA_EXTENSION = '.linaria.module.css';
const GLOBAL_CSS_EXTENSIOM = '.css';

const config = withPrefresh({
  i18n: {
    locales: ['en-US', 'ja-JP'],
    defaultLocale: 'en-US',
  },
  webpack(config, options) {
    const { dev, isServer, defaultLoaders } = options;

    // For styles with Linaria
    traverse(config.module.rules);
    config.module.rules.push({
      test: /(?!_app)\.(tsx|ts)$/,
      exclude: /node_modules/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
            extension: LINARIA_EXTENSION,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /_app\.(tsx|ts)$/,
      exclude: /node_modules/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
            extension: GLOBAL_CSS_EXTENSIOM,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(svg)$/,
      exclude: /node_modules/,
      loader: 'svg-react-loader',
    });

    // Move Preact into the framework chunk instead of duplicating in routes:
    const splitChunks = config.optimization && config.optimization.splitChunks;
    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups;
      const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
          test,
        });
        // if you want to merge the 2 small commons+framework chunks:
        // cacheGroups.commons.name = 'framework';
      }
    }

    // Install webpack aliases:
    const aliases = config.resolve.alias || (config.resolve.alias = {});
    aliases.react = aliases['react-dom'] = 'preact/compat';
    aliases['react-ssr-prepass'] = 'preact-ssr-prepass';
    aliases['@'] = path.join(__dirname, './');

    // Automatically inject Preact DevTools
    if (dev) {
      // inject Preact DevTools
      const entry = config.entry;
      config.entry = () =>
        entry().then((entries) => {
          entries['main.js'] = ['preact/debug'].concat(
            entries['main.js'] || []
          );
          return entries;
        });
    }
    if (dev && isServer) {
      // Remove circular `__self` and `__source` props only meant for
      // development. See https://github.com/developit/nextjs-preact-demo/issues/25
      let oldVNodeHook = preact.options.vnode;
      preact.options.vnode = (vnode) => {
        const props = vnode.props;
        if (props != null) {
          if ('__self' in props) props.__self = null;
          if ('__source' in props) props.__source = null;
        }

        if (oldVNodeHook) {
          oldVNodeHook(vnode);
        }
      };
    }

    return config;
  },
  //ref: https://github.com/preactjs/next-plugin-preact/blob/master/packages/next-plugin-preact/index.js
});

module.exports = config;

const traverse = (rules) => {
  for (let rule of rules) {
    if (typeof rule.loader === 'string' && rule.loader.includes('css-loader')) {
      if (
        rule.options &&
        rule.options.modules &&
        typeof rule.options.modules.getLocalIdent === 'function'
      ) {
        let nextGetLocalIdent = rule.options.modules.getLocalIdent;
        rule.options.modules.getLocalIdent = (
          context,
          _,
          exportName,
          options
        ) => {
          if (context.resourcePath.includes(LINARIA_EXTENSION)) {
            return exportName;
          }
          return nextGetLocalIdent(context, _, exportName, options);
        };
      }
    }
    if (typeof rule.use === 'object') {
      traverse(Array.isArray(rule.use) ? rule.use : [rule.use]);
    }
    if (Array.isArray(rule.oneOf)) {
      traverse(rule.oneOf);
    }
  }
};
