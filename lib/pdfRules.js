const WCAGRule = require('./classes/wcag');
const pdfjs = require('pdfjs-dist');

// This will eventually hold all of the pdf WCAGRules
const rules = [];

const PDF1 = new WCAGRule({
  name: 'PDF1',
  description: 'Applying text alternatives to images with the Alt entry in PDF documents',
  testFunc: doc => new Promise(async (resolve, reject) => {

    // const pages = doc.numPages;

    try {
      // check doc for images 
      // for now just resolve true to test
      const page = await doc.getPage(1);
      const content = await page.getTextContent()
      const viewport = await page.getViewport()
      const annotations = await page.getAnnotations()

      const ops = await page.getOperatorList()

      const imgs = []

      for (var i = 0; i < ops.fnArray.length; i++) {
        if (ops.fnArray[i] == pdfjs.OPS.paintJpegXObject || ops.fnArray[i] == pdfjs.OPS.paintImageXObject) {
          imgs.push(ops.argsArray[i][0])
        }
      }

      console.log({
        imgs,
        content,
        viewport,
        annotations,
        ops
      })
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })

});

const PDF2 = new WCAGRule({
  name: 'PDF2',
  description: 'Creating bookmarks in PDF documents',
  testFunc: doc => new Promise(async (resolve, reject) => {
    try {
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })

})

rules.push(PDF1);

module.exports = { rules };
