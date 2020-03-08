const PDF = require('./classes/pdf');
const { SCAN_PDF } = require('./types/scan');
const { rules } = require('./pdfRules');

/**
 * This is the main function that handles CLI input from meow 
 * @param {string} action 
 * @param {object[]} flags 
 */
const handleCLI = async (action, flags) => {

    const handleError = error => {
        console.error(error);
    }

    const handleScanAction = async flags => {

        const { type, path } = flags;

        if (!type) {
            handleError("No type supplied! Run a11cat --help for instructions.");
        }

        if (!path) {
            handleError("No path supplied! Run a11ycat --help for instructions.");
        }

        const scanPDF = async () => {

            const pdf = new PDF();
            const doc = await pdf.load(path);

            const [PDF1] = rules;

            const PDF1Test = await pdf.test(doc, PDF1);
            console.log(PDF1Test)

        }

        switch (type) {
            case SCAN_PDF:
                scanPDF();
                break;
            default:
                break;
        }

    }

    /**
     * Handles the action providded from the CLI 
     * @param {string} action 
     */
    const handleAction = action => {

        if (action === null || action === undefined) {
            throw new Error("No action supplied! Run a11ycat --help for instructions.")
        }

        if (action === 'scan') {
            handleScanAction(flags);
        }

        return;

    };

    handleAction(action);
};

module.exports = handleCLI;
