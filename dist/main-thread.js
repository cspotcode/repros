"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const log_stack_1 = require("./log-stack");
// Show if sourcemaps are working in the main thread
log_stack_1.logStack('main thread: ');
// Create worker thread
new worker_threads_1.Worker(require.resolve('./worker-thread.js'));
//# sourceMappingURL=main-thread.js.map