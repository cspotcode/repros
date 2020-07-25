# dts-bundle-generator repro

When I try to `import {EventEmitter} from 'events';`, the necessary `/// <reference types="node" />` seems to be removed.  Am I doing something wrong?

Input is `src/index.d.ts`  
Output is `dist/index.d.ts`

```bash
npm install
npm run repro
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN repros@1.0.0 No repository field.
npm WARN repros@1.0.0 No license field.

added 53 packages from 76 contributors and audited 54 packages in 2.882s

4 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


> repros@1.0.0 repro /github/workspace
> dts-bundle-generator --config ./dts-bundle-generator.config.js

Compiling input files...
Processing src/index.d.ts
Library "node" will be added via reference directive
Writing src/index.d.ts -> dist/index.d.ts
Checking generated files...
[0;31mdist/index.d.ts(8,17): error TS2304: Cannot find name 'Options'.[0m

[0;31mError: Compiled with errors[0m
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! repros@1.0.0 repro: `dts-bundle-generator --config ./dts-bundle-generator.config.js`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the repros@1.0.0 repro script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /github/home/.npm/_logs/2020-07-25T22_46_29_660Z-debug.log
```
