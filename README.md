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
npm install git://github.com/mochajs/mocha.git#master
popd
pushd mocha-proposed
npm install git://github.com/cspotcode/mocha.git#feature/json-instead-of-yargs-unparser
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

[Logs](https://github.com/cspotcode/repros/runs/77929050)

```output
/github/workspace/mocha /github/workspace
+ mocha@6.0.2
added 115 packages from 497 contributors and audited 223 packages in 7.985s
found 0 vulnerabilities

/github/workspace
/github/workspace/mocha-proposed /github/workspace
+ mocha@6.0.2
added 107 packages from 493 contributors and audited 152 packages in 4.026s
found 0 vulnerabilities

/github/workspace
12M	./mocha/node_modules
12284	./mocha/node_modules
6.6M	./mocha-proposed/node_modules
6752	./mocha-proposed/node_modules
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.588s
user	0m0.493s
sys	0m0.080s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.432s
user	0m0.365s
sys	0m0.061s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.568s
user	0m0.487s
sys	0m0.072s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.249s
user	0m0.204s
sys	0m0.040s
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.587s
user	0m0.524s
sys	0m0.048s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.440s
user	0m0.397s
sys	0m0.037s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.567s
user	0m0.464s
sys	0m0.095s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.241s
user	0m0.197s
sys	0m0.040s
```