import {Worker} from 'worker_threads';
import {logStack} from './log-stack';

// Show if sourcemaps are working in the main thread
logStack('main thread: ');

// Create worker thread
new Worker(require.resolve('./worker-thread.js'));

