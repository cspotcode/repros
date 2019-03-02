#!/usr/bin/env bash
set -euxo pipefail

function fail {
    echo "$1" 1>&2
    exit 1
}

find . -path ./node_modules -prune -o -name '*.sh' -exec \
    git update-index --chmod=+x '{}' \
';'

git add -A
git commit -m "update" || true
git fetch
branch="$( git rev-parse --abbrev-ref HEAD )"
git rebase "$branch" 
git push origin "$branch"

