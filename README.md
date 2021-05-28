# Title

Description

```bash
# repro code goes here
set -euxo pipefail

npm install enhancedmath
node -p 'require("enhancedmath")' || true
node -p '(async function() {console.dir(await import("enhancedmath"))})()'
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ echo Hello 'world!'
Hello world!
```
