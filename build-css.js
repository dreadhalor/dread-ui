// const fs = require('fs');
import fs from 'fs';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

const inputFile = 'src/index.scss';
const outputFile = 'output.css';

async function buildCSS() {
  try {
    const css = await fs.promises.readFile(inputFile, 'utf8');
    const result = await postcss([
      postcssImport(),
      tailwindcss(),
      autoprefixer(),
    ]).process(css, { from: inputFile, to: outputFile });
    await fs.promises.writeFile(outputFile, result.css);
    console.log('CSS built successfully.');
  } catch (error) {
    console.error('Error building CSS:', error);
  }
}

buildCSS();
