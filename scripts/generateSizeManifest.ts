/* tslint:disable no-console */
// import childProcess from 'child_process';
import * as fs from 'fs';
import { List, Map } from 'immutable';
import * as path from 'path';

const generateDataForFile = (fileName: string, dir: string) => {
  try {
    const bundleSize = fs.statSync(path.join(__dirname, '../' + dir + fileName)).size;
    const bundleSizeGZip = fs.statSync(path.join(__dirname, '../' + dir + fileName + '.gz')).size;

    return Map({
      normal: bundleSize,
      compressed: bundleSizeGZip,
    });
  } catch (e) {
    console.error(
      "Oops! Something went wrong while attempting to generate the bundle sizes for this file. Have a look at generateSizeManifest.js as a starting point. Since something bad happened, we're just reporting zero-ed data for bundle sizes. FILE:" +
        fileName,
      e
    );
    return Map({
      normal: 0,
      compressed: 0,
    });
  }
};

const generateData = () => {
  const fileSizes = {
    'ares-microsite.js': {
      normal: fs.statSync(path.join(__dirname, '../packages/ad-microsite/dist/ares-microsite.js'))
        .size,
      compressed: fs.statSync(
        path.join(__dirname, '../packages/ad-microsite/dist/ares-microsite.js.gz')
      ).size,
    },
    'ares-unit.js': {
      normal: fs.statSync(path.join(__dirname, '../packages/ad-wrapped/dist/ares-unit.js')).size,
      compressed: fs.statSync(path.join(__dirname, '../packages/ad-wrapped/dist/ares-unit.js.gz'))
        .size,
    },
    'ares-unit.css': {
      normal: fs.statSync(path.join(__dirname, '../packages/ad-wrapped/dist/ares-unit.css')).size,
      compressed: fs.statSync(path.join(__dirname, '../packages/ad-wrapped/dist/ares-unit.css.gz'))
        .size,
    },
  };
  return fileSizes;
};

async function processAllFiles() {
  const results = await generateData();
  console.log(JSON.stringify(results, null, 4));
}

if (require.main === module) {
  processAllFiles();
} else {
  module.exports = generateData;
}
