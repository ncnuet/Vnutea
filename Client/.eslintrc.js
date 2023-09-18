module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      excludedFiles: ['*.test.ts', '*.js'],
    },
  ],
};
