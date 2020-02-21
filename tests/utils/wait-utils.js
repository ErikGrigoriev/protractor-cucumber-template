/** Class representing a set of wait utils. */
const WaitUtils = function () {

  /**
   * Waits until given class is existing in given element.
   *
   * @param {element}  element       Element that need to be checked.
   * @param {string}   desiredClass  Elements class that need to be existing in element.
   */
  this.presenceOfCssClassForElement = (element, desiredClass) => {
    return () => {
      return element.getAttribute('class').then((classValue) => {
        return classValue && classValue.indexOf(desiredClass) >= 0;
      });
    };
  };

  /**
   * Waits until given class is absent in given element.
   *
   * @param {element}  element       Element that need to be checked.
   * @param {string}   desiredClass  Elements class that need to be absent in element.
   */
  this.stalenessOfCssClassForElement = (element, desiredClass) => {
    return () => {
      return element.getAttribute('class').then((classValue) => {
        return classValue && classValue.indexOf(desiredClass) < 0;
      });
    };
  };

};
module.exports = new WaitUtils();