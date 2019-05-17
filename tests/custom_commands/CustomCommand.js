const customCommand = function () {

    this.scrollToElement = async function (element) {
        await browser.executeScript("arguments[0].scrollIntoView({block: 'center', behavior: 'instant', inline: 'center'});", element.getWebElement());
    };

    this.waitForCssClassToDisappear = (elementFinder, desiredClass) => {
        return () => {
            return elementFinder.getAttribute('class').then((classValue) => {
                return classValue && classValue.indexOf(desiredClass) < 0;
            });
        };
    };

};
module.exports = customCommand;