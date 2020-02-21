//cucumber-html-reporter options
const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'hierarchy', // report theme
  jsonDir: 'target/cucumber', // directory where cucumber.json files are laying
  output: 'target/report.html', // path and name for report html file
  reportSuiteAsScenarios: true, // displays number of passed/failed Scenarios if set to true and Features if set to false. False is default value
  ignoreBadJsonFile: true, // ignore empty json files in order to not fail report generation
  launchReport: true // open report in browser automatically after generation
};

reporter.generate(options);