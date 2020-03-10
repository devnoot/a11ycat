const mime = require('mime-types');
const pdfjs = require('pdfjs-dist');

/**
 * This class represents a PDF and acts as a wrapper for many pdfjs
 * methods.
 */
class PDF {

    /**
     * Loads a pdf using the pdfjs library.
     * @param {string} path - This can be either an absolute path or a URL
     * @return {PDFDocumentProxy}
     */
    async load(path) {
        const loadingTask = pdfjs.getDocument({ url: path, nativeImageDecoderSupport: 'none' });
        const doc = await loadingTask.promise;
        return doc;
    }

    /**
     * Returns true if the resource at supplied filepath has a valid
     * pdf mime type.
     * @param {string} filepath='' The path to the file on disk.
     * @returns {boolean}
     */
    isValidPdf(filepath = '') {
        const mimeType = mime.lookup(filepath);
        return mimeType === 'application/pdf';
    }

    /**
     * Tests {doc} against {rule}
     * @param {PDFDocumentProxy} doc - The pdf.js document proxyy
     * @param {WCAGRule} rule - The wcag rule to test the doc against
     * @returns {Promise} Resolves with test results object. 
     * Test results object
     * {
     *    passing: boolean,
     *    pctPassing: number,
     *    errors: [string]
     * } 
     */
    async test(doc, rule) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                const results = await rule.test(doc);
                resolve(results);
            } catch (error) {
                reject(error);
            }

        });
    }

    /**
     * Test if {doc} has a title.
     * 
     * If there is no outline for {doc}, then the test will fail.
     * If there are multiple top level sections in the outline,
     *   and any of them do not have a title, the test will fail 
     * 
     * @param {PDFDocumentProxy} doc 
     * @returns {boolean}
     */
    async hasTitle(doc) {
        const outline = await doc.getOutline();

        if (!outline) {
            return false;
        }

        for (const section of outline) {
            if (!section.title) {
                return false;
            }
        }

        return true;
    }

}

module.exports = PDF;