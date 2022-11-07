import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const input = './src/index.tsx';
const banner = `
/** @license Docco ${pkg.version}
 *
 * This source code is licensed under the ${pkg.license} license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * ${pkg.repository.url}
 */`;
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const plugins = [
  external(),
  postcss({
    modules: true,
  }),
  json(),
  typescript({
    useTsconfigDeclarationDir: true,
    exclude: ['**/__tests__/**', '*.spec.*', '*.test.*'],
    clean: true,
  }),
  resolve(),
  commonjs(),
  sourceMaps(),
  filesize({
    showMinifiedSize: false,
    showGzippedSize: true,
  }),
  license({ banner }),
];

export default {
  input,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      exports: 'auto',
      name: 'Docco',
      globals,
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins,
};
