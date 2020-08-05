# Using yargs' bundled type declarations

```bash
# repro code goes here
set -euxo pipefail

npm install
./node_modules/.bin/tsc -p .
# Emits type errors from the built-in declarations.
# This will eventually be a bug *iff* yargs plans to allow
# consumers to use these declarations instead of the ones from
# @types/yargs.  That is for the yargs team to decide.
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ npm install
npm WARN workspace No repository field.
npm WARN workspace No license field.

added 29 packages from 54 contributors and audited 29 packages in 1.749s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

++ ./node_modules/.bin/tsc -p .
node_modules/yargs/build/lib/command.d.ts(5,41): error TS7016: Could not find a declaration file for module 'require-directory'. '/github/workspace/node_modules/require-directory/index.js' implicitly has an 'any' type.
  Try `npm install @types/require-directory` if it exists or add a new declaration (.d.ts) file containing `declare module 'require-directory';`
node_modules/yargs/build/lib/command.d.ts(12,54): error TS2304: Cannot find name 'NodeRequireFunction'.
node_modules/yargs/build/lib/command.d.ts(58,45): error TS2344: Type '"default" | "alias" | "array"' does not satisfy the constraint '"string" | "number" | "boolean" | "normalize" | "alias" | "array" | "__" | "choices" | "config" | "configObjects" | "configuration" | "count" | "defaultDescription" | "demandedCommands" | ... 6 more ... | "skipValidation"'.
  Type '"default"' is not assignable to type '"string" | "number" | "boolean" | "normalize" | "alias" | "array" | "__" | "choices" | "config" | "configObjects" | "configuration" | "count" | "defaultDescription" | "demandedCommands" | ... 6 more ... | "skipValidation"'.
node_modules/yargs/build/lib/completion.d.ts(4,46): error TS7016: Could not find a declaration file for module 'yargs-parser'. '/github/workspace/node_modules/yargs-parser/index.js' implicitly has an 'any' type.
  Try `npm install @types/yargs-parser` if it exists or add a new declaration (.d.ts) file containing `declare module 'yargs-parser';`
node_modules/yargs/build/lib/usage.d.ts(4,22): error TS7016: Could not find a declaration file for module 'y18n'. '/github/workspace/node_modules/y18n/index.js' implicitly has an 'any' type.
  Try `npm install @types/y18n` if it exists or add a new declaration (.d.ts) file containing `declare module 'y18n';`
node_modules/yargs/build/lib/validation.d.ts(4,35): error TS7016: Could not find a declaration file for module 'yargs-parser'. '/github/workspace/node_modules/yargs-parser/index.js' implicitly has an 'any' type.
  Try `npm install @types/yargs-parser` if it exists or add a new declaration (.d.ts) file containing `declare module 'yargs-parser';`
node_modules/yargs/build/lib/validation.d.ts(5,22): error TS7016: Could not find a declaration file for module 'y18n'. '/github/workspace/node_modules/y18n/index.js' implicitly has an 'any' type.
  Try `npm install @types/y18n` if it exists or add a new declaration (.d.ts) file containing `declare module 'y18n';`
node_modules/yargs/build/lib/yargs.d.ts(4,188): error TS7016: Could not find a declaration file for module 'yargs-parser'. '/github/workspace/node_modules/yargs-parser/index.js' implicitly has an 'any' type.
  Try `npm install @types/yargs-parser` if it exists or add a new declaration (.d.ts) file containing `declare module 'yargs-parser';`
node_modules/yargs/build/lib/yargs.d.ts(9,22): error TS7016: Could not find a declaration file for module 'y18n'. '/github/workspace/node_modules/y18n/index.js' implicitly has an 'any' type.
  Try `npm install @types/y18n` if it exists or add a new declaration (.d.ts) file containing `declare module 'y18n';`
node_modules/yargs/build/lib/yargs.d.ts(11,41): error TS7016: Could not find a declaration file for module 'require-directory'. '/github/workspace/node_modules/require-directory/index.js' implicitly has an 'any' type.
  Try `npm install @types/require-directory` if it exists or add a new declaration (.d.ts) file containing `declare module 'require-directory';`
node_modules/yargs/build/lib/yargs.d.ts(157,39): error TS2339: Property 'aliases' does not exist on type 'DetailedArguments'.
node_modules/yargs/build/lib/yargs.d.ts(158,46): error TS2339: Property 'aliases' does not exist on type 'DetailedArguments'.
```
