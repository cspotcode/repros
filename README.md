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

[Logs](https://github.com/cspotcode/repros/runs/76724994)

```output
/github/workspace/mocha /github/workspace
+ mocha@6.0.2
added 230 packages from 589 contributors and audited 1137 packages in 10.87s
found 0 vulnerabilities

/github/workspace
/github/workspace/mocha-proposed /github/workspace
+ mocha@6.0.2
added 238 packages from 589 contributors and audited 1137 packages in 6.16s
found 0 vulnerabilities

/github/workspace
17M	./mocha/node_modules
17M	./mocha-proposed/node_modules
6.0.2
6.0.2
6.0.2
6.0.2
```
