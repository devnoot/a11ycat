const path = require('path');
const mime = require('mime-types');
const crypto = require('crypto');
const fetch = require('node-fetch');
const fs = require('fs');
const fsp = fs.promises;

class PDF {
    
    constructor() {
        this._rules = [];
    }

    setFilepath(filepath) {
        this._filepath = filepath;
    }

    setURL(url) {
        this._url = url;
    }

    async scanURL(url) {
        const response = await fetch(url);
        await new Promise((resolve, reject) => {
            try {
                if (response.status >= 200 && response.status < 400) {
                    const tmpFilename = crypto.randomBytes(8).toString('hex');
                    const tmpFilepath = path.join(__dirname, '..', 'tmp', tmpFilename);
                    const filestream = fs.createWriteStream(tmpFilepath);            
                    response.body.pipe(filestream);
                    filestream.on('finish', () => {
                        resolve();
                    }); 
                }

                if (response.status >= 400) {
                    const msg = `There was an error trying to download ${url} \n`
                    + `Received: ${response.status} ${response.statusText}`;
                    reject(msg);
                }
            } catch(error) {
                reject(error);
            }
        });
    }

    async scanFile(filepath) {
        const pdf = await fsp.readFile(filepath);
        await new Promise((resolve, reject) => {
            try {
                const isValid = this.isValidPdf(filepath);
                if (!isValid) {
                    reject('Invalid PDF ', pdf);
                } 
                // perform tests here
            } catch(error) {
                reject(error);
            }
        });
    }

    async scan() {
        if (this._filepath) {
            await this.scanFile(this._filepath);
        }

        if (this._url) {
            await this.scanURL(this._url);
        }
    }

    isValidPdf() {
        const mimeType = mime.lookup(this._filepath);
        return mimeType === 'application/pdf';
    }

}

module.exports = PDF;