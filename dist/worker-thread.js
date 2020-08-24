"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_stack_1 = require("./log-stack");
// Show if sourcemaps are enabled and/or working in the worker thread
console.dir({ workerThreadExecArgv: process.execArgv });
log_stack_1.logStack('worker thread: ');
//# sourceMappingURL=worker-thread.js.map