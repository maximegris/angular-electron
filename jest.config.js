const { createCjsPreset } = require('jest-preset-angular/presets');
const esModules = [].join('|');

module.exports = {
  ...createCjsPreset(),
  rootDir : './src',
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        allowSyntheticDefaultImports: true,
      },
    ],
    '^.+\\.js$': 'babel-jest',
  },
};
