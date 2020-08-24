"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logStack = void 0;
function logStack(prefix) {
    console.log(prefix + (new Error()).stack);
}
exports.logStack = logStack;
//# sourceMappingURL=log-stack.js.map