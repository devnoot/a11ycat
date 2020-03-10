# a11ycat

A11ycat is a NodeJS-based tools that may be used to identify and remedy unaccessible files

## Installation

**HOLD UP!**

***This build is not production ready. The instructions provided are for testing purposes only.***

```
git clone https://github.com/devnoot/a11ycat.git a11ycat
cd a11ycat
npm install
npm link
```


## How to use

```
   Usage
        $ a11ycat <action> <options>

    Actions
      scan  Scans a (singular) resource for accessibility

    Options
      --type, -t  The type of scan. Valid types are "pdf"
      --path, -p  The path to the resource to be scanned. This can be
                  either a url, or a file on the disk.
      --fix,  -F  Attempt to fix the resource. This will not overwrite the resource,
                  but instead create a fixed copy of the resource.

    Examples
        $ a11ycat scan --type pdf --path /path/to/some/file
        $ a11ycat scan --type pdf --path https://google.com/google.pdf
```
