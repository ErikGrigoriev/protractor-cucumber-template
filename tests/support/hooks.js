const fs = require('fs-extra');
const path = require('path');

module.exports = function() {

    this.Before(function () {
        const pageNotFound = $('#main-frame-error');
        assert.eventually.equal(
            pageNotFound.isPresent(),
            false,
            "Page Not Found error");
    });

    this.After(function (scenario, callback) {
        if (scenario.isFailed()) {
            if(browser.imageComparisonName) {
                const fileData = fs.readFileSync(_getDiffImagePath());
                browser.driver.manage().window().setSize(1366, 768);
                scenario.attach(fileData, 'image/png', error => callback(error));
            }
            else {
                browser.takeScreenshot().then(function (base64png) {
                    const decodedImage = new Buffer(base64png, 'base64');
                    scenario.attach(decodedImage, 'image/png', function (error) {
                        callback(error);
                    });
                }, function (err) {
                    callback(err);
                });
            }
        }
        else {
            callback();
        }
        browser.imageComparisonName = null;
    });
};

function _getDiffImagePath() {

    const imageComparisonConfig = browser.protractorImageComparison;
    const imageName = [
        browser.imageComparisonName,
        '-',
        imageComparisonConfig.browserName,
        '-',
        imageComparisonConfig.browserWidth,
        'x',
        imageComparisonConfig.browserHeight,
        '-dpr-',
        imageComparisonConfig.devicePixelRatio,
        '.png'
    ].join('');

    return path.join('screenshots/actual/diff/', imageName);
}