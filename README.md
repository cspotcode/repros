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
++ echo Hello 'world!'
Hello world!
```
