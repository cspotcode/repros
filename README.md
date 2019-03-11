# Title

Mocha load-time benchmark

```bash
# repro code goes here
set -euxo pipefail

npm install mocha
time node -r mocha
time node ./node_modules/mocha/bin/mocha
time node ./node_modules/mocha/bin/mocha --version


```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/75779559)

```output
+ mocha@6.0.2
added 230 packages from 589 contributors and audited 1137 packages in 10.583s
found 0 vulnerabilities
```