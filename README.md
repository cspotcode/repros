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
time node ./mocha/node_modules/.bin/mocha || true
time node ./mocha-proposed/node_modules/.bin/mocha || true
time node ./mocha/node_modules/.bin/mocha --version || true
time node ./mocha-proposed/node_modules/.bin/mocha --version || true
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
Hello world!
```
