# yarnPath is absolute, not portable

`yarn set version berry` sets an absolute path to yarn, not a relative one.  I think this is a bug since everything is saved locally, so the rc file is meant to be portable.

```bash
set -euxo pipefail

export FORCE_COLOR=0
curl -o- -L https://yarnpkg.com/install.sh | bash
yarn set version berry
node --version
yarn --version
cat ./.yarnrc.yml
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ export FORCE_COLOR=0
++ FORCE_COLOR=0
++ bash
++ curl -o- -L https://yarnpkg.com/install.sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    54  100    54    0     0    915      0 --:--:-- --:--:-- --:--:--   915
100  7152  100  7152    0     0  50366      0 --:--:-- --:--:-- --:--:-- 50366
[37mInstalling Yarn![0m
[36m> Downloading tarball...[0m

[1/2]: https://yarnpkg.com/latest.tar.gz --> /tmp/yarn.tar.gz.Ign0jlITNz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    57  100    57    0     0    513      0 --:--:-- --:--:-- --:--:--   513
100    93  100    93    0     0    505      0 --:--:-- --:--:-- --:--:--   505
100   609    0   609    0     0   1964      0 --:--:-- --:--:-- --:--:--  1964
100 1214k  100 1214k    0     0  3123k      0 --:--:-- --:--:-- --:--:-- 3123k

[2/2]: https://yarnpkg.com/latest.tar.gz.asc --> /tmp/yarn.tar.gz.Ign0jlITNz.asc
100    61  100    61    0     0   4692      0 --:--:-- --:--:-- --:--:--  4692
100    97  100    97    0     0   4041      0 --:--:-- --:--:-- --:--:--  4041
100   613    0   613    0     0   4316      0 --:--:-- --:--:-- --:--:--  4316
100  1028  100  1028    0     0   6306      0 --:--:-- --:--:-- --:--:--  6306
[33m> WARNING: GPG is not installed, integrity can not be verified![0m
[36m> Extracting to ~/.yarn...[0m
[36m> Adding to $PATH...[0m
[31m> Profile not found. Tried  (as defined in $PROFILE), ~/.bashrc, ~/.bash_profile, ~/.zshrc, and ~/.profile.
> Create one of them and run this script again
> Create it (touch ) and run this script again
   OR
> Append the following lines to the correct file yourself:[0m

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
++ yarn set version berry
Resolving berry to a url...
Downloading https://github.com/yarnpkg/berry/raw/master/packages/berry-cli/bin/berry.js...
Saving it into /github/workspace/.yarn/releases/yarn-berry.js...
Updating /github/workspace/.yarnrc.yml...
Done!
++ node --version
v12.15.0
++ yarn --version
2.0.0-rc.28
++ cat ./.yarnrc.yml
yarnPath: "/github/workspace/.yarn/releases/yarn-berry.js"
```
