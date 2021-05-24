#!/usr/bin/env bash
set -euxo pipefail

rm -rf plop || true
git clone --branch webpack https://github.com/plopjs/plop

cd plop

npm install
npm run build
npm pack
sudo npm install -g plop*.tgz

cd ..

set +e

which plop
plop --version
plop --help
plop
# try again, capturing a log
plop &> log.txt
