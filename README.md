```shell
# Run against node nightly.  This example is on x64 Linux
wget https://nodejs.org/download/nightly/v19.0.0-nightly202207093d575a4f1b/node-v19.0.0-nightly202207093d575a4f1b-linux-x64.tar.gz
tar -xvzf node-v19.0.0-nightly202207093d575a4f1b-linux-x64.tar.gz
export PATH="$PWD/node-v19.0.0-nightly202207093d575a4f1b-linux-x64/bin:$PATH"

# v19.0.0-nightly202207093d575a4f1b
node --version

# Run the reproduction
node --loader ./loader.mjs ./index.cjs
```

# Expected

```
❯ node --experimental-import-meta-resolve --loader ./loader.mjs ./index.mjs 

... logging omitted ...

Before calling runMain
loader resolve(./empty.mjs)

Calling runMain
loader resolve(file:///d/Personal-dev/@cspotcode/repros/node-loader-chaining-duplication/index.mjs)
Done calling runMain

After calling runMain()
loader resolve(./empty.mjs)
```

# Actual

Note that the loader hook is duplicated within the loader chain after calling `runMain`

```
❯ node --experimental-import-meta-resolve --loader ./loader.mjs ./index.mjs 

... logging omitted ...

Before calling runMain
loader resolve(./empty.mjs)

Calling runMain
loader resolve(file:///d/Personal-dev/@cspotcode/repros/node-loader-chaining-duplication/index.mjs)
loader resolve(file:///d/Personal-dev/@cspotcode/repros/node-loader-chaining-duplication/index.mjs)
Done calling runMain

After calling runMain()
loader resolve(./empty.mjs)
loader resolve(./empty.mjs)
```
