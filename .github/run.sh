#!/usr/bin/env bash
set -euo pipefail

readme=$(cat README.md)
./.github/regexp.js "$readme" '```bash\n([\s\S]*?)\n```' '' 1 > ./.github/extracted

token="${GITHUB_TOKEN:-}"
GITHUB_TOKEN=''
set -x +e
bash ./.github/extracted 2>&1 | tee ./.github/output
set -e

GITHUB_TOKEN="$token"

if [[ "${GITHUB_EVENT_PATH:-}" = "" ]] ; then
    exit
fi

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
git config user.email cspotcode@gmail.com
git commit -m "Update README with script output"
git push origin "$( git rev-parse --abbrev-ref HEAD )"
