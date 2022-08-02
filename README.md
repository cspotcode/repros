```
❯ node --loader ./loader-log-args.mjs --loader ./loader-pass-undefined.mjs index.js 
(node:30294) ExperimentalWarning: Custom ESM Loaders is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[Arguments] {
  '0': 'file:///d/Personal-dev/@cspotcode/repros/node-loader-chaining-next-args/index.js',
  '1': {
    conditions: [ 'node', 'import', 'node-addons' ],
    importAssertions: [Object: null prototype] {},
    parentURL: undefined
  },
  '2': undefined,
  '3': [AsyncFunction: nextResolve]
}
file:///d/Personal-dev/@cspotcode/repros/node-loader-chaining-next-args/loader-log-args.mjs:3
    return next(url, context);
           ^

TypeError: next is not a function
    at resolve (file:///d/Personal-dev/@cspotcode/repros/node-loader-chaining-next-args/loader-log-args.mjs:3:12)
    at nextResolve (node:internal/modules/esm/loader:173:28)
    at resolve (file:///d/Personal-dev/@cspotcode/repros/node-loader-chaining-next-args/loader-pass-undefined.mjs:2:12)
    at nextResolve (node:internal/modules/esm/loader:173:28)
    at ESMLoader.resolve (node:internal/modules/esm/loader:852:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:439:18)
    at ESMLoader.import (node:internal/modules/esm/loader:536:22)
    at node:internal/modules/run_main:58:28
    at loadESM (node:internal/process/esm_loader:83:11)
    at async handleMainPromise (node:internal/modules/run_main:65:12)

Node.js v18.6.0

```