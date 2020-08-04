# Swatinem/rollup-plugin-dts #24

Repro of https://github.com/Swatinem/rollup-plugin-dts/issues/24

```bash
# repro code goes here
set -euxo pipefail

npm install

echo "----"
echo "Test that input is valid"
./node_modules/.bin/tsc -p tsconfig.test-input.json

echo "----"
echo "Bundle"
./node_modules/.bin/rollup -c

echo "----"
echo "Emitted declarations:"
cat ./output.d.ts

echo "----"
echo "Test that output is valid"
./node_modules/.bin/tsc -p ./tsconfig.test-output.json
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ echo Hello 'world!'
Hello world!
```
