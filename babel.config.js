module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@types': './src/types',
          '@screens': './src/screens',
          '@configs': './src/configs',
          '@navigators': './src/navigators',
          '@hooks': './src/hooks',
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@redux': './src/redux',
          '@libs': './src/libs',
        },
      },
    ],
  ],
};
