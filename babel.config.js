const plugins = [
  [
    'module-resolver',
    {
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@': './app',
        'react-native-sqlite-storage': 'react-native-quick-sqlite',
      },
    },
  ],
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
  ['@babel/plugin-proposal-optional-catch-binding'],
  'react-native-reanimated/plugin',
  '@babel/plugin-proposal-export-namespace-from',
];

const babelConfig = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins,
};

module.exports = babelConfig;
