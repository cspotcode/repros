# mocha find-up vs findup-sync 

mocha startup performance and node_modules install size using find-up vs findup-sync.

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

[Logs](https://github.com/cspotcode/repros/runs/77834948)

```output
/github/workspace/mocha /github/workspace
+ mocha@6.0.2
added 115 packages from 497 contributors and audited 223 packages in 8.048s
found 0 vulnerabilities

/github/workspace
/github/workspace/mocha-proposed /github/workspace
+ mocha@6.0.2
added 108 packages from 493 contributors and audited 152 packages in 4.085s
found 0 vulnerabilities

/github/workspace
12M	./mocha/node_modules
12284	./mocha/node_modules
6.7M	./mocha-proposed/node_modules
6832	./mocha-proposed/node_modules
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.589s
user	0m0.521s
sys	0m0.059s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.455s
user	0m0.373s
sys	0m0.067s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.581s
user	0m0.487s
sys	0m0.081s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.252s
user	0m0.211s
sys	0m0.036s
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.584s
user	0m0.523s
sys	0m0.052s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.445s
user	0m0.373s
sys	0m0.063s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.589s
user	0m0.513s
sys	0m0.060s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.251s
user	0m0.222s
sys	0m0.024s
```
