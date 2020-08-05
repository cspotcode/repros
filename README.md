# Title

Description

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
++ echo Hello 'world!'
Hello world!
```
