'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('rollup-plugin-typescript2');
var commonjs = require('@rollup/plugin-commonjs');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var babel = require('@rollup/plugin-babel');
var terser = require('@rollup/plugin-terser');
var json = require('@rollup/plugin-json');

const isWatch = process.env.ROLLUP_WATCH === 'true';

const plugins = [
  pluginNodeResolve.nodeResolve({
    jsnext: true,
    main: true,
  }),
  commonjs(),
  typescript(),
  json(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    compact: true,
    extensions: ['.js', '.ts'],
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          targets: '> 2.5%, not dead',
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      ['@babel/plugin-proposal-class-properties'],
      ['@babel/plugin-transform-template-literals'],
    ],
  }),
  // Only minify in non-watch (build) mode for better dev experience
  !isWatch && terser(),
].filter(Boolean);

var rollup_config = {
  input: ['./src/index.ts'],
  output: {
    file: 'dist/sunsynk-power-flow-card.js',
    format: 'esm',
    name: 'SunsynkPowerFlowCard',
    inlineDynamicImports: true,
    sourcemap: true,
  },
  watch: {
    clearScreen: false,
  },
  plugins: [...plugins],
  onwarn: function (warning, handler) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }

    // console.warn everything else
    handler(warning);
  },
};

exports.default = rollup_config;
