import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  daStyle,
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      linebreakStyle: ['error', 'windows'],
      camelcase: ['error', { allow: ['created_at', 'updated_at'] }],
    },
  },
];
