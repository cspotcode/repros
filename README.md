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
++ npm install
npm WARN workspace No repository field.
npm WARN workspace No license field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 14 packages from 9 contributors and audited 15 packages in 1.238s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities

++ echo ----
----
++ echo 'Test that input is valid'
Test that input is valid
++ ./node_modules/.bin/tsc -p tsconfig.test-input.json
++ echo ----
----
++ echo Bundle
Bundle
++ ./node_modules/.bin/rollup -c

./input.d.ts → output.d.ts...
created output.d.ts in 17ms
++ echo ----
----
++ echo 'Emitted declarations:'
Emitted declarations:
++ cat ./output.d.ts
const foo = 123;

export { foo };
++ echo ----
----
++ echo 'Test that output is valid'
Test that output is valid
++ ./node_modules/.bin/tsc -p ./tsconfig.test-output.json
output.d.ts(1,1): error TS1046: Top-level declarations in .d.ts files must start with either a 'declare' or 'export' modifier.
```
