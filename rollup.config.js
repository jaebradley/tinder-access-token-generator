import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import { terser } from 'rollup-plugin-terser';


import pkg from './package.json';

const config = {
  external: [
    'axios',
    'puppeteer',
    '@babel/runtime/regenerator',
    '@babel/runtime/helpers/asyncToGenerator',
  ],
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      globals: {
        axios: 'axios',
        puppeteer: 'puppeteer',
        '@babel/runtime/regenerator': '_regeneratorRuntime',
        '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      globals: {
        axios: 'axios',
        puppeteer: 'puppeteer',
        '@babel/runtime/regenerator': '_regeneratorRuntime',
        '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator',
      },
    },
    {
      file: pkg.module,
      format: 'es',
      name: pkg.name,
      globals: {
        axios: 'axios',
        puppeteer: 'puppeteer',
        '@babel/runtime/regenerator': '_regeneratorRuntime',
        '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator',
      },
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    localResolve(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true,
    }),
    minify(),
    terser(),
    commonjs(),
    filesize(),
  ],
};

export default config;
