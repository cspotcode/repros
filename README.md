# Load times for lodash vs alternatives

For CLI tools, load times are more important than dependency download size.  This benchmark compares the load times
of various ways to `require()` a `_.get()` function or equivalent.

Scroll to the bottom for a summary.  `lodash/get` is no faster than `lodash.min.js`.  `lodash.get` is fastest,
but consider if `lodash` will already be in npm cache and/or in-memory from another library `require()`ing it.

Remember fs perf hit is exacerbated on Windows.

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

[Logs](https://github.com/cspotcode/repros/runs/71561091)

```output
+ yarn install
yarn install v1.13.0
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 1.68s.
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ for i in 0 1 2 3 4 5 6 7 8 9
+ test lodash 1.lodash
+ node -e '
        const start = +new Date;
        require('\''lodash'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/lodash.min.js 2.lodash.min.js
+ node -e '
        const start = +new Date;
        require('\''lodash/lodash.min.js'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash.get 3.lodash.get
+ node -e '
        const start = +new Date;
        require('\''lodash.get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test lodash/get 4.lodash_slash_get
+ node -e '
        const start = +new Date;
        require('\''lodash/get'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ test get-value 5.get-value
+ node -e '
        const start = +new Date;
        require('\''get-value'\'');
        const end = +new Date;
        console.log(end - start)
    '
+ node ./aggregate.js

     1.lodash      |  2.lodash.min.js   |    3.lodash.get    | 4.lodash_slash_get |    5.get-value     
        27         |         22         |         5          |         25         |         4         
        27         |         23         |         5          |         23         |         5         
        27         |         22         |         5          |         24         |         5         
        28         |         24         |         6          |         23         |         5         
        28         |         22         |         5          |         24         |         5         
        28         |         23         |         5          |         23         |         4         
        29         |         22         |         5          |         23         |         5         
        29         |         24         |         5          |         24         |         5         
        28         |         22         |         5          |         23         |         5         
       Avg         |        Avg         |        Avg         |        Avg         |        Avg         
        28         |         23         |         5          |         24         |         5          
```