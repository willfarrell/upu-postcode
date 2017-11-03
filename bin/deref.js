const util = require('util');
const fs = require('fs');

const $RefParser = require('json-schema-ref-parser');
const writeFile = util.promisify(fs.writeFile);

const srcFile = 'src/postcode.json';
const distFile = 'dist/postcode.full.json';

$RefParser.dereference(srcFile)
    .then((schemaJSON) => {
        console.log(srcFile, schemaJSON);
        return writeFile(distFile, JSON.stringify(schemaJSON, null, 2), {encoding: 'utf8'});
    })
    .catch((err) => {
        console.error('Error: deref', srcFile, err);
    });
