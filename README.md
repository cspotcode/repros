# Title

Description

```bash
# repro code goes here
set -euxo pipefail

function test {
    node -e "
        const start = +new Date;
        require('$1');
        const end = +new Date;
        console.log(end - start)
    " >> "log-$2"
}
for i in 0 1 2 3 4 5 6 7 8 9 ; do
    test lodash lodash
    test lodash.get lodash.get
    test lodash/get lodash_slash_get
    test get-value get-value
done

node ./aggregate.js

```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/71547202)

```output

```