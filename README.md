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

[Logs](https://github.com/cspotcode/repros/runs/77840067)

```output
/github/workspace/mocha /github/workspace
+ mocha@6.0.2
added 115 packages from 497 contributors in 18.184s
/github/workspace
/github/workspace/mocha-proposed /github/workspace
+ mocha@6.0.2
added 107 packages from 493 contributors and audited 152 packages in 5.001s
found 0 vulnerabilities

/github/workspace
12M	./mocha/node_modules
12284	./mocha/node_modules
6.6M	./mocha-proposed/node_modules
6756	./mocha-proposed/node_modules
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.592s
user	0m0.496s
sys	0m0.077s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.435s
user	0m0.372s
sys	0m0.057s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.558s
user	0m0.462s
sys	0m0.083s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.246s
user	0m0.206s
sys	0m0.037s
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.607s
user	0m0.526s
sys	0m0.064s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.465s
user	0m0.419s
sys	0m0.040s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.603s
user	0m0.516s
sys	0m0.078s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.262s
user	0m0.233s
sys	0m0.024s
```