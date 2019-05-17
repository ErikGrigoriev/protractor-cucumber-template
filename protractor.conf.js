exports.config = {

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    ignoreDefaultArgs: false,
    ignoreUncaughtExceptions: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 1,
        acceptInsecureCerts: true,
        "goog:chromeOptions": {
            args: ['--incognito', '--no-sandbox', '--disable-gpu']
        }
    },

    specs: ['tests/features/**/*.feature'],

    cucumberOpts: {
        require: [
            'tests/step_definitions/**/*.js',
            'tests/support/*.js'
        ],
        format: [
            'pretty',
            `json:target/cucumber/cucumber${Math.random()}.json`
        ]
    },

    onPrepare: function () {
        const chai = require('chai');
        const chaiAsPromised = require('chai-as-promised');
        const customCommands = require('./tests/custom_commands/CustomCommand');
        chai.use(chaiAsPromised);
        global.assert = chai.assert;
        global.until = protractor.ExpectedConditions;
        global.customCommands = new customCommands();
        browser.waitForAngularEnabled(false);
        const protractorImageComparison = require('protractor-image-comparison');
        browser.protractorImageComparison = new protractorImageComparison(
            {
                baselineFolder: 'screenshots-reference/',
                screenshotPath: 'screenshots/actual/',
                autoSaveBaseline: true,
                disableCSSAnimation: true,
                ignoreNothing: true,
                saveAboveTolerance: 5
            }
        );
    },
};