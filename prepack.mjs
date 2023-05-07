import {writeFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {resolve} from 'path';

console.log('This is our prepack script. Building the module now.');
writeFileSync(resolve(fileURLToPath(import.meta.url), '../generated.js'), 'exports.foo = "hello world"');