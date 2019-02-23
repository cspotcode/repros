#!/usr/bin/env bash
set -euo pipefail

readme=$(cat README.md)
re='```
(.*)
```'
[[ "$readme" =~ $re ]] || echo false
printf "%s" "${BASH_REMATCH[1]}" > ./.github/extracted

set -x
. ./.github/extracted

