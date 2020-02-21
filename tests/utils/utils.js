/** Class representing a set of general utils. */
const Utils = function () {

  /**
   * Scrolls given element into view.
   *
   * @param {element} element Description.
   */
  this.scrollToElement = async (element) => {
    const browserCapabilities = await browser.getCapabilities();
    const browserName = browserCapabilities.get('browserName');
    await browser.executeScript("arguments[0].scrollIntoView({block: 'center', behavior: 'instant', inline: 'center'});", element.getWebElement());
    if (browserName === 'internet explorer') {
      await browser.sleep(250);
      await browser.executeScript('window.scrollBy(-200, -200)');
    }
    await browser.sleep(250);
  };

  /**
   * Switches to newly opened tab, closing previous.
   */
  this.closeFirstTab = async () => {
    let windowHandles = await browser.getAllWindowHandles();
    let windowsAmount = windowHandles.length;
    const firstTab = windowHandles[0];
    let secondTab = windowHandles[1];

    await browser.wait(function () {
      return windowsAmount === 2
    }, 30000, 'No new tab is opened after click on the link!');
    await browser.switchTo().window(firstTab);
    await browser.driver.close();
    await browser.switchTo().window(secondTab);
  };

  /**
   * Generates random string value.
   *
   * @param {int} length  String length.
   *
   * @return {string} Random string of given length.
   */
  this.generateRandomString = (length) => {
    return Math.random().toString(36).slice(2, 2 + 10).repeat(10).substring(0, length);
  };

};
module.exports = new Utils();