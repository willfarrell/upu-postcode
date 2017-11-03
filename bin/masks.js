const util = require('util');
const fs = require('fs');

const _ = require('lodash');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const srcFile = 'dist/postcode.full.json';
const distFile = 'dist/postcode.masks.json';

const masks = {};

readFile(srcFile)
    .then((data) => {
        data = JSON.parse(data);

        Object.keys(data).forEach((key) => {
            masks[key] = {
                placeholders: data[key].formats,
                masks: data[key].masks,
                helperText: _.uniq(data[key].formats).join(', ')
            }
        });

        return writeFile(distFile, JSON.stringify(masks, null, 2), {encoding: 'utf8'});
    })
    .catch((err) => {
        console.error('Error: masks', srcFile, err);
    });
