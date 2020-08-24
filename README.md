# --enable-source-maps in worker_thread

--enable-source-maps does not appear to apply to stack traces within a worker_thread

```bash
# repro code goes here
set -euxo pipefail

n latest
node --version
npm install

# Build a project with sourcemaps
./node_modules/.bin/tsc -p .

# require() log-stack.js in both main and worker threads
node --enable-source-maps ./dist/main-thread.js
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ n latest

  installing : node-v14.8.0
       mkdir : /usr/local/n/versions/node/14.8.0
       fetch : https://nodejs.org/dist/v14.8.0/node-v14.8.0-linux-x64.tar.gz
   installed : v14.8.0 (with npm 6.14.7)

++ node --version
v14.8.0
++ npm install
npm WARN workspace No repository field.
npm WARN workspace No license field.

added 1 package from 1 contributor and audited 1 package in 1.068s
found 0 vulnerabilities

++ ./node_modules/.bin/tsc -p .
++ node --enable-source-maps ./dist/main-thread.js
{ mainThreadExecArgv: [ '--enable-source-maps' ] }
main thread: Error
    at Object.logStack (/github/workspace/dist/log-stack.js:5:27)
        -> /github/workspace/src/log-stack.ts:9:27
    at Object.<anonymous> (/github/workspace/dist/main-thread.js:7:13)
        -> /github/workspace/src/main-thread.ts:6:1
    at Module._compile (internal/modules/cjs/loader.js:1251:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1272:10)
    at Module.load (internal/modules/cjs/loader.js:1100:32)
    at Function.Module._load (internal/modules/cjs/loader.js:956:16)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
{ workerThreadExecArgv: [ '--enable-source-maps' ] }
worker thread: Error
    at Object.logStack (/github/workspace/dist/log-stack.js:5:27)
    at Object.<anonymous> (/github/workspace/dist/worker-thread.js:6:13)
    at Module._compile (internal/modules/cjs/loader.js:1251:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1272:10)
    at Module.load (internal/modules/cjs/loader.js:1100:32)
    at Function.Module._load (internal/modules/cjs/loader.js:956:16)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at MessagePort.<anonymous> (internal/main/worker_thread.js:169:24)
    at MessagePort.[nodejs.internal.kHybridDispatch] (internal/event_target.js:352:41)
    at MessagePort.exports.emitMessage (internal/per_context/messageport.js:18:26)
```
