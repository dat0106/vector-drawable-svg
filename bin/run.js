#!/usr/bin/env node
const { transform } = require('../src/vector-drawable-svg');
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile) {
  throw new Error('inputFile is invalid');
}

if (!outputFile) {
  throw new Error('outputFile is invalid');
}

const inPath = path.resolve(inputFile);
const outPath = path.resolve(outputFile);


// throw error if inPath does not exist and not a directory
if (!fs.existsSync(inPath)) {
  throw new Error('input file does not exist');
}

// check inPath is a directory
if (!fs.lstatSync(inPath).isDirectory()) {
  throw new Error('input file is not a directory');
}

// throw error if outPath already exists
if (!fs.existsSync(outPath)) {
  // create it
  fs.mkdirSync(outPath); 
  // throw new Error('output  file does not exist');
} 

// get all file in the directory and convert them
if (fs.lstatSync(inPath).isDirectory()) {
  const files = fs.readdirSync(inPath);

  files.forEach((file) => {
    console.log(`file ${file} is converting`);

    try {
      const content = transform(fs.readFileSync(path.join(inPath, file), 'utf8'));
      // replace file .xml to .svg
      file = file.replace('.xml', '.svg');

      fs.writeFileSync(path.join(outPath, file), content, { encoding: 'utf8' });
      console.log(`file ${file} is converted`);
    } catch (error) {
      console.log(error)
    }
 
  }
  );
  return;
}


// if (!fs.existsSync(inPath)) {
//   throw new Error('input file does not exist');
// }

// if (fs.existsSync(outputFile)) {
//   throw new Error('output already exists');
// }

const content = transform(fs.readFileSync(inPath, 'utf8'));

fs.writeFileSync(outPath, content, { encoding: 'utf8' });



