module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-paper/babel',
    "nativewind/babel",
    [
      "module-resolver", {
        alias: {
          "@": "./src"
        }
      }
    ],

  ],
};
