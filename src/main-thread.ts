import {Worker} from 'worker_threads';
import {logStack} from './log-stack';

// Show if sourcemaps are enabled and/or working in the main thread
console.dir({mainThreadExecArgv: process.execArgv});
logStack('main thread: ');

// Create worker thread
new Worker(require.resolve('./worker-thread.js'));

