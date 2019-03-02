# Load times for lodash vs alternatives

For CLI tools, load times are more important than dependency download size.  This benchmark compares the load times
of various ways to `require()` a `_.get()` function or equivalent.

```bash
# repro code goes here
set -euxo pipefail
yarn install

function test {
    node -e "
        const start = +new Date;
        require('$1');
        const end = +new Date;
        console.log(end - start)
    " >> "log-$2"
}
for i in 0 1 2 3 4 5 6 7 8 9 ; do
    test lodash 1.lodash
    test lodash/lodash.min.js 2.lodash.min.js
    test lodash.get 3.lodash.get
    test lodash/get 4.lodash_slash_get
    test get-value 5.get-value
done

node ./aggregate.js

```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/71555675)

```output
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
internal/modules/cjs/loader.js:583
    throw err;
    ^

Error: Cannot find module 'lodash'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
    at Function.Module._load (internal/modules/cjs/loader.js:507:25)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:22:18)
    at [eval]:3:9
    at Script.runInThisContext (vm.js:96:20)
    at Object.runInThisContext (vm.js:303:38)
    at Object.<anonymous> ([eval]-wrapper:6:22)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at evalScript (internal/bootstrap/node.js:587:27)
```