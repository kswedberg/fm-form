// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';
import minimist from 'minimist';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: 'src/index.js',

  plugins: {
    preVue: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      // converts commonjs modules to es2015
      commonjs(),
    ],
    vue: {
      css: false,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      buble(),
    ],
  },
};

// UMD/IIFE shared settings: externals and output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const external = [
  'vue',
  'vuex',
];
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
};

const buildFormats = [];

// Customize configs for individual targets

if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    output: {
      file: 'dist/fm-form.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      del({
        targets: 'dist/styles.js',
      }),
      terser({
        output: {
          ecma: 6,
        },
      }),
      copy({
        targets: [
          {src: 'src/css/*.css', dest: 'dist/css'},
          {src: 'src/icons/*', dest: 'dist/icons'},
        ],
      }),
    ],
  };

  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/fm-form.cjs.js',
      format: 'cjs',
      name: 'FmForm',
      exports: 'named',
      globals,
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      ...baseConfig.plugins.postVue,
    ],
  };

  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/fm-form.min.js',
      format: 'iife',
      name: 'FmForm',
      exports: 'named',
      globals: {vue: 'Vue'},
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };

  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
