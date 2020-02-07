# yarnPath is absolute, not portable

`yarn set version berry` sets an absolute path to yarn, not a relative one.  I think this is a bug since everything is saved locally, so the rc file is meant to be portable.

```bash
set -euxo pipefail

export FORCE_COLOR=0
curl -o- -L https://yarnpkg.com/install.sh | bash
yarn set version berry
cat ./.yarnrc.yml
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ echo Hello 'world!'
Hello world!
```
