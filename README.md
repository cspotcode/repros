# Title

Description

```bash
# repro code goes here
set -euxo pipefail

# Buggy behavior
tsc || true

rm node_modules/foo/bar/baz/package.json

# Removing baz/package.json allows tsc to behave correctly, mapping from ./bar/baz.d.ts to ./compat/bar/baz.d.ts
tsc || true
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ echo Hello 'world!'
Hello world!
```
