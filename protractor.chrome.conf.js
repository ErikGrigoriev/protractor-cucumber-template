// Default protractor configuration
let globalConf = require('./global.protractor.conf.js'); // Import base configuration

globalConf.capabilities = {
  browserName: 'chrome',
  shardTestFiles: true, // When set to true creates separate json files for each Feature. Set to true in order to run tests in parallel
  maxInstances: 20, // Specifies amount of browser instances that need to be used for tests.
  acceptInsecureCerts: true, // Accept insecure certificates automatically.
  // Chrome specific options. Visit https://peter.sh/experiments/chromium-command-line-switches/ for more details
  "goog:chromeOptions": {
    args: ['--headless', '--incognito', '--no-sandbox', '--disable-gpu'] //TDO Check 2
  }
};

exports.config = globalConf;