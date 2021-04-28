const withPrefresh = require("@prefresh/next");
const preact = require("preact");

module.exports = withPrefresh({
  webpack(config, options) {
    const { dev, isServer } = options;

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
    aliases.react = aliases["react-dom"] = "preact/compat";
    aliases["react-ssr-prepass"] = "preact-ssr-prepass";

    // Automatically inject Preact DevTools
    if (dev) {
      // inject Preact DevTools
      const entry = config.entry;
      config.entry = () =>
        entry().then((entries) => {
          entries["main.js"] = ["preact/debug"].concat(
            entries["main.js"] || []
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
          if ("__self" in props) props.__self = null;
          if ("__source" in props) props.__source = null;
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
