# Title

Description

```bash
# repro code goes here
set -euxo pipefail

npm install enhancedmath
node -p 'require("enhancedmath")' || true
node -p '(async function() {console.dir(await import("enhancedmath"))})()'
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ npm install enhancedmath
npm WARN saveError ENOENT: no such file or directory, open '/github/workspace/package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open '/github/workspace/package.json'
npm WARN workspace No description
npm WARN workspace No repository field.
npm WARN workspace No README data
npm WARN workspace No license field.

+ enhancedmath@2.9.0
added 2 packages from 2 contributors and audited 2 packages in 0.99s
found 0 vulnerabilities

++ node -p 'require("enhancedmath")'
internal/modules/cjs/loader.js:1085
      throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
      ^

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /github/workspace/node_modules/enhancedmath/lib/index.js
require() of ES modules is not supported.
require() of /github/workspace/node_modules/enhancedmath/lib/index.js from /github/workspace/[eval] is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from /github/workspace/node_modules/enhancedmath/package.json.

    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1085:13)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at Module.require (internal/modules/cjs/loader.js:957:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at [eval]:1:1
    at Script.runInThisContext (vm.js:133:18)
    at Object.runInThisContext (vm.js:310:38)
    at internal/process/execution.js:77:19
    at [eval]-wrapper:6:22 {
  code: 'ERR_REQUIRE_ESM'
}
++ true
++ node -p '(async function() {console.dir(await import("enhancedmath"))})()'
Promise { <pending> }
(node:38) UnhandledPromiseRejectionWarning: Error: Cannot find module './factorial'
Require stack:
- /github/workspace/[eval]
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:885:15)
    at Function.Module._load (internal/modules/cjs/loader.js:730:27)
    at Module.require (internal/modules/cjs/loader.js:957:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at file:///github/workspace/node_modules/enhancedmath/lib/index.js:3:19
    at ModuleJob.run (internal/modules/esm/module_job.js:152:23)
    at async Loader.import (internal/modules/esm/loader.js:177:24)
    at async importModuleDynamicallyWrapper (internal/vm/module.js:449:15)
    at async [eval]:1:32
(Use `node --trace-warnings ...` to show where the warning was created)
(node:38) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
(node:38) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```
