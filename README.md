# tsc resolver bug

This bug manifests when:

- trying to import from `node_modules`, `foo/bar/baz`
- `foo/bar/baz.d.ts` and `foo/bar/baz/package.json` both exist
- there is `typesVersions` mapping in `foo/package.json` to rewrite `foo/bar/baz.d.ts` into `foo/compat/bar/baz.d.ts`

```bash
# repro code goes here
set -euxo pipefail

npm install

# Buggy behavior
./node_modules/.bin/tsc || true

# Removing baz/package.json allows tsc to behave correctly, mapping from ./bar/baz.d.ts to ./compat/bar/baz.d.ts
rm node_modules/foo/bar/baz/package.json

# Now it works
./node_modules/.bin/tsc || true
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ echo Hello 'world!'
Hello world!
```
