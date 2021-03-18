module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid-common-ts/eslint'),
    require.resolve('@gera2ld/plaid-common-react/eslint'),
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
