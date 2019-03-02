#!/usr/bin/env bash
set -euo pipefail

name="$1"
init="$2"

git fetch
# Checkout new branch off of origin/master
git checkout -b "$name" origin/master
git branch "--set-upstream-to=origin/$name"
./.github/init-$init.sh
