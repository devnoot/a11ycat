const PDF = require('./pdf.class');

const handleCLI = async (action, flags) => {

    // If the user supplied both url and file flags, do not proceed. 
    if (flags.url && flags.file) {
        throw new Error('Supply either a URL or File, not both.');
    }

    const scanAction = async flags => {

        const pdf = new PDF();

        if (flags.type && flags.type === 'pdf') {

            if (flags.url) {
                pdf.setURL(flags.url);
            }

            if (flags.file) {
                pdf.setFilepath(flags.file);
            }
            
            await pdf.scan();
        }

    };

    const handleAction = action => {

        switch(action) {
        case 'scan':
            scanAction(flags);
            break;
        default:
            console.error(action + ' is not recognized.');
            break;
        }

    };

    handleAction(action);
};

module.exports = handleCLI;
