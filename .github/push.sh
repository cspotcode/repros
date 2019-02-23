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
git pull --rebase
git push
