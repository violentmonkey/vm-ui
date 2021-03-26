const { getRollupPlugins, getRollupExternal, defaultOptions } = require('@gera2ld/plaid');
const pkg = require('./package.json');

const DIST = defaultOptions.distDir;
const FILENAME = 'index';
const BANNER = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License */`;

const external = getRollupExternal();
const bundleOptions = {
  extend: true,
  esModule: false,
};
const postcssOptions = {
  ...require('@gera2ld/plaid/config/postcssrc'),
  inject: false,
  minimize: true,
  modules: {
    generateScopedName: 'vmui-[hash:base64:6]',
  },
};
const rollupConfig = [
  {
    input: {
      input: 'src/index.ts',
      plugins: getRollupPlugins({
        esm: true,
        extensions: defaultOptions.extensions,
        postcss: postcssOptions,
      }),
      external,
    },
    output: {
      format: 'esm',
      file: `${DIST}/${FILENAME}.esm.js`,
    },
  },
  ...[false, true].map(minimize => ({
    input: {
      input: 'src/index.ts',
      plugins: getRollupPlugins({
        minimize,
        esm: true,
        extensions: defaultOptions.extensions,
        postcss: postcssOptions,
      }),
    },
    output: {
      format: 'iife',
      file: `${DIST}/${FILENAME}${minimize ? '.min' : ''}.js`,
      name: 'VM',
      ...bundleOptions,
    },
  })),
];

rollupConfig.forEach((item) => {
  item.output = {
    indent: false,
    // If set to false, circular dependencies and live bindings for external imports won't work
    externalLiveBindings: false,
    ...item.output,
    ...BANNER && {
      banner: BANNER,
    },
  };
});

module.exports = rollupConfig.map(({ input, output }) => ({
  ...input,
  output,
}));
