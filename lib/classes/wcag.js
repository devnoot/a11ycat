/**
 * This class represents a WCAG Rule.
 * @see https://www.w3.org/TR/WCAG20-TECHS/pdf
 * @constructor
 * @param {object} params
 * @param {string} params.name - The name of the rule.
 * @param {string} params.description - What the rule checks for.
 * @param {function} params.testFunc - The test function. This function
 * should return a {boolean}. If the supplied resource to this function
 * passes the test, it should return true. If it does not pass, return
 * false. 
 */
class WCAGRule {
  constructor(params) {
    const { name, description, testFunc } = params
    this._name = name;
    this._description = description;
    this._testFunc = testFunc;
  }

  /**
   * Performs the test on {doc}
   * @param {PDFDocumentProxy} doc
   * @returns {Promise} A promise resolves with the test results
   *
   */
  test(doc) {
    if (!doc) {
      return new Promise.reject('No document supplied');
    }
    return this._testFunc(doc)
  }
}

module.exports = WCAGRule; 