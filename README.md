# tsc resolver bug

This bug manifests when:

- trying to import from `node_modules`, `foo/bar/baz`
- `foo/bar/baz.d.ts` and `foo/bar/baz/package.json` both exist
- there is `typesVersions` mapping in `foo/package.json` to rewrite `foo/bar/baz.d.ts` into `foo/compat/bar/baz.d.ts`

```bash
# repro code goes here
set -euxo pipefail

npm install
git checkout -- node_modules/foo

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
++ npm install
npm WARN deprecated core-js@2.6.12: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated

> core-js@2.6.12 postinstall /github/workspace/node_modules/core-js
> node -e "try{require('./postinstall')}catch(e){}"

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.3 (node_modules/sane/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN tsc-resolver-confusion@ No repository field.
npm WARN tsc-resolver-confusion@ No license field.

added 518 packages from 335 contributors, updated 1 package and audited 520 packages in 20.134s

6 packages are looking for funding
  run `npm fund` for details

found 46 low severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
++ git checkout -- node_modules/foo
++ ./node_modules/.bin/tsc
======== Resolving module 'foo/bar/baz' from '/github/workspace/index.ts'. ========
Explicitly specified module resolution kind: 'NodeJs'.
Loading module 'foo/bar/baz' from 'node_modules' folder, target file type 'TypeScript'.
Found 'package.json' at '/github/workspace/node_modules/foo/bar/baz/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/github/workspace/node_modules/foo/bar/baz.ts' does not exist.
File '/github/workspace/node_modules/foo/bar/baz.tsx' does not exist.
File '/github/workspace/node_modules/foo/bar/baz.d.ts' exist - use it as a name resolution result.
Resolving real path for '/github/workspace/node_modules/foo/bar/baz.d.ts', result '/github/workspace/node_modules/foo/bar/baz.d.ts'.
======== Module name 'foo/bar/baz' was successfully resolved to '/github/workspace/node_modules/foo/bar/baz.d.ts'. ========
node_modules/foo/bar/baz.d.ts(1,9): error TS1005: ';' expected.
node_modules/foo/bar/baz.d.ts(1,16): error TS1005: ';' expected.
++ true
++ rm node_modules/foo/bar/baz/package.json
++ ./node_modules/.bin/tsc
======== Resolving module 'foo/bar/baz' from '/github/workspace/index.ts'. ========
Explicitly specified module resolution kind: 'NodeJs'.
Loading module 'foo/bar/baz' from 'node_modules' folder, target file type 'TypeScript'.
File '/github/workspace/node_modules/foo/bar/baz/package.json' does not exist.
Found 'package.json' at '/github/workspace/node_modules/foo/package.json'.
'package.json' has a 'typesVersions' field with version-specific path mappings.
'package.json' has a 'typesVersions' entry '<5.0' that matches compiler version '4.1.2', looking for a pattern to match module name 'bar/baz'.
Module name 'bar/baz', matched pattern '*'.
Trying substitution 'compat/*', candidate module location: 'compat/bar/baz'.
File '/github/workspace/node_modules/foo/compat/bar/baz.ts' does not exist.
File '/github/workspace/node_modules/foo/compat/bar/baz.tsx' does not exist.
File '/github/workspace/node_modules/foo/compat/bar/baz.d.ts' exist - use it as a name resolution result.
Resolving real path for '/github/workspace/node_modules/foo/compat/bar/baz.d.ts', result '/github/workspace/node_modules/foo/compat/bar/baz.d.ts'.
======== Module name 'foo/bar/baz' was successfully resolved to '/github/workspace/node_modules/foo/compat/bar/baz.d.ts'. ========
```
