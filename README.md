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
npm install mocha
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

[Logs](https://github.com/cspotcode/repros/runs/77830654)

```output
/github/workspace/mocha /github/workspace
+ mocha@6.0.2
added 230 packages from 589 contributors and audited 1137 packages in 10.407s
found 0 vulnerabilities

/github/workspace
/github/workspace/mocha-proposed /github/workspace
+ mocha@6.0.2
added 115 packages from 497 contributors and audited 223 packages in 4.904s
found 0 vulnerabilities

/github/workspace
17M	./mocha/node_modules
16808	./mocha/node_modules
12M	./mocha-proposed/node_modules
12288	./mocha-proposed/node_modules
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m1.041s
user	0m0.875s
sys	0m0.147s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.608s
user	0m0.499s
sys	0m0.083s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m1.011s
user	0m0.876s
sys	0m0.120s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.343s
user	0m0.290s
sys	0m0.048s
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m1.019s
user	0m0.846s
sys	0m0.151s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.568s
user	0m0.460s
sys	0m0.098s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.911s
user	0m0.780s
sys	0m0.119s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.309s
user	0m0.238s
sys	0m0.059s
```