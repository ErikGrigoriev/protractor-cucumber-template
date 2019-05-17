const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonDir: 'target/cucumber',
    output: 'target/report.html',
    reportSuiteAsScenarios: true,
    ignoreBadJsonFile: true,
    launchReport: false
};

reporter.generate(options);