#!/usr/bin/env bash
set -euo pipefail

readme="$(cat README.md)"
node -e '
    const readme = process.argv[1];
    const script = readme.match(/```bash\n([\s\S]*?)```/)[1];
    console.log(script);
' "$readme" > ./.github/extracted
chmod +x ./.github/extracted

echo "EXTRACTED SCRIPT:"
echo "-----------------"
printf "%s\n" "$(cat ./.github/extracted)"
echo "-----------------"

token="${GITHUB_TOKEN:-}"
GITHUB_TOKEN=''
set +e
./.github/extracted | tee ./.github/output
set -e

GITHUB_TOKEN="$token"

# Get ID of this Actions run
checkRunId=$(
    curl -H Accept:application/vnd.github.antiope-preview+json \
        "https://api.github.com/repos/cspotcode/repros/commits/$( git rev-parse HEAD )/check-runs" | \
        ./.github/extract-json.js check_runs 0 id
)

node -e '
    const readmeInput = process.argv[1];
    const log = process.argv[2];
    const readmeOutput = readmeInput.replace(
        /(\[Logs\][\s\S]*?```output\n)[\s\S]*?(\n```)/,
        (all, logPrefix, logSuffix) => `${ logPrefix }${ log }${logSuffix}`
    );
    console.log(readmeOutput);
' "$readme" "$(cat ./.github/output)" > ./README.md
git add README.md
git config user.email cspotcode@gmail.com
git commit -m "Update README with script output"
git push origin "$( git rev-parse --abbrev-ref HEAD )"
