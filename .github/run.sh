#!/usr/bin/env bash
set -euo pipefail

readme=$(cat README.md)
re='```
(.*)
```'
[[ "$readme" =~ $re ]] || echo false
printf "%s" "${BASH_REMATCH[1]}" > ./.github/extracted

token="$GITUB_TOKEN"
GITHUB_TOKEN=''
set -x +e
. ./.github/extracted | tee ./.github/output

GITHUB_TOKEN="$token"
readme=$(cat README.md)
re='(.*)```output
.*
```(.*)'
[[ "$readme" =~ $re ]] || echo false
printf "%s" "${BASH_REMATCH[1]}$( cat ./.github/output )${BASH_REMATCH[3]}" > ./README.md
git add README.md
git commit -m "update README with script output"
git push
