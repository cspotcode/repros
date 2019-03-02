# Title

Description

```bash
# repro code goes here
set -euxo pipefail

echo Hello world!
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/71547202)

```output
Hello world!
```