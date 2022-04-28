## Reproduction:

Run `tsc` with the version of typescript declared in `package.json`: 4.7.0-dev.20220428

```
npm install
./node_modules/.bin/tsc
./node_modules/.bin/tsc --project ./tsconfig-with-bug-workaround.json
```

For the sake of this bug report, the results have been committed to version control.
