module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid-common-ts/eslint'),
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
    VM: true,
  },
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'import/extensions': 'off',
  },
};
