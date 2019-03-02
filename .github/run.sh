#!/usr/bin/env bash
set -euo pipefail

readme=$(cat README.md)
re='```bash
(.*?)
```'
[[ "$readme" =~ $re ]]
printf "%s" "${BASH_REMATCH[1]}" > ./.github/extracted

token="${GITHUB_TOKEN:-}"
GITHUB_TOKEN=''
set -x +e
. ./.github/extracted | tee ./.github/output
set -e

GITHUB_TOKEN="$token"

# Get ID of this Actions run
checkRunId=$(
    curl -H Accept:application/vnd.github.antiope-preview+json \
        "https://api.github.com/repos/cspotcode/repros/commits/$( git rev-parse HEAD )/check-runs" | \
        ./.github/extract-json.js check_runs 0 id
)

re='(.*)
\[Logs\]\((.*?)\)

```output
.*
```(.*)$'
[[ "$readme" =~ $re ]]
printf "%s" "${BASH_REMATCH[1]}
[Logs](https://github.com/cspotcode/repros/runs/$checkRunId)

\`\`\`output
$( cat ./.github/output )
\`\`\`${BASH_REMATCH[3]}" > ./README.md
git add README.md
git commit -m "Update README with script output"
git config user.email cspotcode@gmail.com
git push
