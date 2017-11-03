const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const srcFile = 'dist/postcode.full.json';
const distFile = 'dist/postcode.jsonschema.json';

const schema = {
    "id":"postcode",
    "definitions":{}
};

readFile(srcFile)
    .then((data) => {
        data = JSON.parse(data);

        Object.keys(data).forEach((key) => {
            schema.definitions[key] = {
                "type":"string",
                "pattern":data[key].pattern
            };
        });

        return writeFile(distFile, JSON.stringify(schema, null, 2), {encoding: 'utf8'});
    })
    .catch((err) => {
        console.error('Error: jsonschema', srcFile, err);
    });
