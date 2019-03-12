# Title

Description

```bash
# repro code goes here
set -euxo pipefail

mkdir mocha
mkdir mocha-proposed
pushd mocha
npm install mocha
popd
pushd mocha-proposed
npm install git://github.com/cspotcode/mocha.git#find-up-as-findupSync-replacement
popd
du -s -h ./mocha/node_modules
du -s -h ./mocha-proposed/node_modules
(
  time node ./mocha/node_modules/.bin/mocha || true
  time node ./mocha-proposed/node_modules/.bin/mocha || true
  time node ./mocha/node_modules/.bin/mocha --version || true
  time node ./mocha-proposed/node_modules/.bin/mocha --version || true
) >&1
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76714846)

```output
/github/workspace/mocha /github/workspace
+ mocha@6.0.2
added 230 packages from 589 contributors and audited 1137 packages in 9.58s
found 0 vulnerabilities

/github/workspace
/github/workspace/mocha-proposed /github/workspace
+ mocha@6.0.2
added 238 packages from 589 contributors and audited 1137 packages in 6.737s
found 0 vulnerabilities

/github/workspace
17M	./mocha/node_modules
17M	./mocha-proposed/node_modules
6.0.2
6.0.2
```
