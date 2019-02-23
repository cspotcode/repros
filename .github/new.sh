#!/usr/bin/env bash
set -euxo pipefail

name="$1"
init="$2"

git fetch
# Checkout new branch off of origin/master
git checkout -b "$name" origin/master
./.github/init-$init.sh
