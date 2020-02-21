// Basic protractor configuration independent from browsers/environments
module.exports = {

  // Both framework and frameworkPath specifying framework that is used to run protractor tests
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // Used to specify environment.
  // This value is used as beginning of the link eg. "browser.get('/login')" will open:
  // "http://localhost:4300/login"
  baseUrl: 'http://localhost:4300',

  ignoreUncaughtExceptions: true, //displayes uncought exception as warning instead of breaking tests

  // Used to specify address where selenium WebDriver is running
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Path to feature files
  specs: ['tests/features/**/*.feature'],

  // Specific Cucumber options
  cucumberOpts: {
    // Path to step definition files and additional support files, like hooks.js, env.js etc
    require: [
      'tests/step_definitions/**/*.js',
      'tests/support/*.js'
    ],
    // format of result json files
    format: [
      `json:target/cucumber/cucumber.json`
    ]
  },

  // Plugins that are used in framework
  plugins: [
    {
      // Protractor Visual Regresseion plugin
      package: 'protractor-image-comparison',
      options: {
        // Path to reference screenshots. If folder is not existing it would be automatically generated
        baselineFolder: 'screenshots-reference/',
        // Path to actual and difference screenshots. "actual" and "difference" folders would be automatically generated.
        screenshotPath: 'screenshots/',
        // Automatically saves screenshots if there no reference yet saved
        autoSaveBaseline: true,
        // Disables css animations in order to make test more stable
        disableCSSAnimation: true,
        // Value that specifies percentage of acceptable difference. Used to reduce failed tests because of system glitches.
        // Could be reduced or increased based on environment stability
        saveAboveTolerance: 5,
        // Option needed to get difference value in order to use it in assertion
        returnAllCompareData: true
      },
    },
  ],

  // onPrepare contains everything that should be executed before anything else
  async onPrepare() {
    // Importing all required packages and utils that are used in the whole test
    const chai = require('chai');
    const MailListener = require('mail-listener5').MailListener;
    const chaiAsPromised = require('chai-as-promised');
    const path = require('path');
    chai.use(chaiAsPromised);
    global.superagent = require('superagent');
    global.until = protractor.ExpectedConditions;
    global.assert = chai.assert;
    global.utils = require('./tests/utils/utils');
    global.waitUntil = require('./tests/utils/wait-utils');
    global.mailUtils = require('./tests/utils/mail-utils');
    global.restUtils = require('./tests/utils/rest-utils');
    global.mailListener = new MailListener({
      username: "usename@mail.mail",
      password: "Password",
      host: "hostname",
      port: 993,
      tls: true,
      connTimeout: 10000, // Default by node-imap
      authTimeout: 5000, // Default by node-imap,
      debug: null, // Or your custom function with only one incoming argument. Default: null
      tlsOptions: { rejectUnauthorized: false },
      mailbox: "INBOX", // mailbox to monitor
      searchFilter: ["UNSEEN", "ALL"], // the search filter being used after an IDLE notification has been retrieved
      markSeen: true, // all fetched email will be marked as seen and not fetched next time
      fetchUnreadOnStart: false, // use it only if you want to get all unread email on lib start. Default is `false`,
    });

    // Integrated wait for Angular based functions. Need to be set to false, since it times out if no ANgular based functions are found.
    // Need to be disabled before browser start.
    await browser.waitForAngularEnabled(false);
  },
};