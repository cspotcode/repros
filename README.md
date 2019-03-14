# mocha remove yargs-unparser by passing JSON to _mocha
 
mocha startup performance and node_modules install size by replacing yargs-unparser with JSON-passing.

./mocha is installing from mochajs/mocha#master

./mocha-proposed uses mocha from my pull-request branch.

```bash
#!/usr/bin/env bash
# repro code goes here
set -euxo pipefail

mkdir mocha
mkdir mocha-proposed
pushd mocha
npm install git://github.com/mochajs/mocha.git#009814704df229b7c38edd0b8c503e701e9bb323
popd
pushd mocha-proposed
npm install git://github.com/cspotcode/mocha.git#feature/load-reports-and-interfaces-on-demand
popd
du -s -h ./mocha/node_modules
du -s ./mocha/node_modules
du -s -h ./mocha-proposed/node_modules
du -s ./mocha-proposed/node_modules
(
  time node ./mocha/node_modules/.bin/mocha || true
  time node ./mocha-proposed/node_modules/.bin/mocha || true
  time node ./mocha/node_modules/.bin/mocha --version || true
  time node ./mocha-proposed/node_modules/.bin/mocha --version || true
  time node ./mocha/node_modules/.bin/mocha || true
  time node ./mocha-proposed/node_modules/.bin/mocha || true
  time node ./mocha/node_modules/.bin/mocha --version || true
  time node ./mocha-proposed/node_modules/.bin/mocha --version || true
) 2>&1
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/77909075)

```output
```
