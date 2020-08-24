import {logStack} from './log-stack';

// Show if sourcemaps are enabled and/or working in the worker thread
console.dir({workerThreadExecArgv: process.execArgv});
logStack('worker thread: ');