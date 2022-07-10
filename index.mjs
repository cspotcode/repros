import {runMain} from 'module';
import {setTimeout} from 'timers/promises';

console.log('');

console.log('Before calling runMain');
await import.meta.resolve('./empty.mjs');

console.log('');

console.log('Calling runMain');
runMain();
await setTimeout(1000);
console.log('Done calling runMain');

console.log('');

console.log('After calling runMain()');
await import.meta.resolve('./empty.mjs');

