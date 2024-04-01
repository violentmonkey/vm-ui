import { defineExternal, definePlugins } from '@gera2ld/plaid-rollup';
import { defineConfig } from 'rollup';
import pkg from './package.json' assert { type: 'json' };

const banner = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License */`;

const external = defineExternal(['@violentmonkey/dom']);
const bundleOptions = {
  extend: true,
  esModule: false,
};
const postcssOptions = {
  inject: false,
  minimize: true,
  modules: {
    generateScopedName: 'vmui-[hash:base64:6]',
  },
};
const replaceValues = {
  'process.env.VERSION': pkg.version,
};

export default defineConfig([
  {
    input: 'src/index.ts',
    plugins: definePlugins({
      esm: true,
      postcss: postcssOptions,
      replaceValues,
    }),
    external,
    output: {
      format: 'esm',
      file: `dist/index.mjs`,
      banner,
    },
  },
  {
    input: 'src/index.ts',
    plugins: definePlugins({
      esm: true,
      postcss: postcssOptions,
      replaceValues,
    }),
    external,
    output: {
      format: 'iife',
      file: `dist/index.js`,
      name: 'VM',
      banner,
      globals: {
        '@violentmonkey/dom': 'VM',
      },
      ...bundleOptions,
    },
  },
]);
