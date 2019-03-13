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

[Logs](https://github.com/cspotcode/repros/runs/77833792)

```output
/github/workspace/mocha /github/workspace
+ mocha@6.0.2
added 230 packages from 589 contributors in 20.379s
/github/workspace
/github/workspace/mocha-proposed /github/workspace
+ mocha@6.0.2
added 108 packages from 493 contributors and audited 152 packages in 3.5s
found 0 vulnerabilities

/github/workspace
17M	./mocha/node_modules
16808	./mocha/node_modules
6.7M	./mocha-proposed/node_modules
6832	./mocha-proposed/node_modules
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.780s
user	0m0.706s
sys	0m0.059s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.416s
user	0m0.338s
sys	0m0.071s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.766s
user	0m0.656s
sys	0m0.098s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.240s
user	0m0.196s
sys	0m0.040s
+ node ./mocha/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.775s
user	0m0.666s
sys	0m0.092s
+ true
+ node ./mocha-proposed/node_modules/.bin/mocha
[31mError: No test files found: "test"[39m

real	0m0.419s
user	0m0.347s
sys	0m0.068s
+ true
+ node ./mocha/node_modules/.bin/mocha --version
6.0.2

real	0m0.769s
user	0m0.664s
sys	0m0.095s
+ node ./mocha-proposed/node_modules/.bin/mocha --version
6.0.2

real	0m0.236s
user	0m0.206s
sys	0m0.028s
```
