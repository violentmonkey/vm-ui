module.exports = {
  extends: require.resolve('@gera2ld/plaid/config/babelrc-base'),
  presets: [
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'VM.h',
      pragmaFrag: 'VM.Fragment'
    }],
  ].filter(Boolean),
};
