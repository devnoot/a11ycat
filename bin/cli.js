#!/usr/bin/env node
const meow = require('meow');
const main = require('../lib/main');

const cli = meow(`
    Usage
        $ a11ycat <action> <options>

    Actions
      scan  Scans a (singular) resource for accessibility

    Options
      --type, -t  The type of scan. Valid types are "pdf"
      --url,  -r  The url to the resource to scan.
      --file, -f  The input file of the resource to scan.
      --fix,  -F  Attempt to fix the resource. This will not overwrite the resource,
                  but instead create a fixed copy of the resource.

    Examples
        $ a11ycat scan --type pdf --file /path/to/some/file 
        $ a11ycat scan --type website --url https://google.com
        $ a11ycat scan --type pdf --url https://my-cool-site.com/my-cool-file.pdf

`, {
    flags: {
        type: {
            type: 'string',
            alias: 't' 
        },
        url: {
            type: 'string',
            alias: 'u'
        },
        file: {
            type: 'string',
            alias: 'f'
        },
        fix: {
            type: 'boolean',
            alias: 'f'
        }
    }
});

main(cli.input[0], cli.flags);
