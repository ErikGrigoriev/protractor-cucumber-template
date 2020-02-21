/*
Cucumber specific hooks

BeforeAll, AfterAll - runs in the beginning/end of Feature file, before any Scenario is executed. Is not displayed in report
Before, After - runs before/after each scenario. Can be more than one. Is displayed in report if something was attached to it. Executed from the bottom to the top.
*/
const fs = require('fs-extra');
const path = require('path');
const { After } = require('cucumber');

After(async function (scenarioResult) {

  // Attach screenshot in case Scenario is failed, or difference picture in case scenario is failed while doing visual regression
  if (scenarioResult.result.status === 'failed') {
    if (browser.imageComparisonName) {
      const fileData = fs.readFileSync(_getDiffImagePath());
      const b64log = Buffer.from('Difference image').toString('base64');
      this.attach(b64log, 'text/plain');
      this.attach(fileData, 'image/png');
    } else {
      const screenShot = await browser.driver.takeScreenshot();
      this.attach(screenShot, 'image/png');
    }
  }
  browser.imageComparisonName = null;
  browser.sharedData = null;
});

After(async function (scenarioResult) {

  // Attach actual picture in case scenario is failed while doing visual regression
  if (scenarioResult.result.status === 'failed' && browser.imageComparisonName) {
    const fileData = fs.readFileSync(_getActualImagePath());
    const b64log = Buffer.from('Actual image').toString('base64');
    this.attach(b64log, 'text/plain');
    this.attach(fileData, 'image/png');
  }
});

After(async function (scenarioResult) {

  // Attach reference picture in case scenario is failed while doing visual regression
  if (scenarioResult.result.status === 'failed' && browser.imageComparisonName) {
    const fileData = fs.readFileSync(_getReferenceImagePath());
    const b64log = Buffer.from('Reference image').toString('base64');
    this.attach(b64log, 'text/plain');
    this.attach(fileData, 'image/png');
  }
});

//returns absolute path to difference image
function _getDiffImagePath() {

  const imageName = browser.imageComparisonName;

  return path.join('screenshots/diff/', imageName);
}

//returns absolute path to actual image
function _getActualImagePath() {

  const imageName = browser.imageComparisonName;

  return path.join('screenshots/actual/', imageName);
}

//returns absolute path to reference image
function _getReferenceImagePath() {

  const imageName = browser.imageComparisonName;

  return path.join('screenshots-reference/', imageName);
}