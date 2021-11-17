/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: '.',
  timeout: 45000,
  outputDir: './screenshots',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 1000,
    },
    trace: 'on',
  },
  expect: {
    toMatchSnapshot: { threshold: 0.2 },
  },
};

module.exports = config;
