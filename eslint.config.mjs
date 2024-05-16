/** @format */

import globals from 'globals';
import pluginJs from '@eslint/js';
import nodePlugin from 'eslint-plugin-node';

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: 'script',
    },
    plugins: {
      node: nodePlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      'node/no-missing-import': 'error',
    },
    ignores: ['node_modules', '**/*.config.js', '!**/eslint.config.mjs'],
  },
  pluginJs.configs.recommended,
];
