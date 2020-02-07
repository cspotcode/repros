# yarn 2 patch: protocol bug

When using the patch: protocol to add new dependencies to a package.json, yarn 2 does not install those new dependencies.

```bash
set -euxo pipefail

curl -o- -L https://yarnpkg.com/install.sh | bash
yarn install
yarn why sanctuary-def
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
Hello world!
```
