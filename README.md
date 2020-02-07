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
[37mInstalling Yarn![0m
[36m> Downloading tarball...[0m
[33m> WARNING: GPG is not installed, integrity can not be verified![0m
[36m> Extracting to ~/.yarn...[0m
[36m> Adding to $PATH...[0m
[31m> Profile not found. Tried  (as defined in $PROFILE), ~/.bashrc, ~/.bash_profile, ~/.zshrc, and ~/.profile.
> Create one of them and run this script again
> Create it (touch ) and run this script again
   OR
> Append the following lines to the correct file yourself:[0m

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
```
