## "Find references" bug reproduction

Try:

```shell
npm install typescript@4.0
# tell vscode to restart ts server, make sure it's using 4.0
# hover over `thisOneFailsOnTs4Dot1AndUp` in `foo.js`; find references; it shows a reference in `bar` (Good)
```

Then repeat the steps above, but install TS 4.1.

It will not find the reference in `bar`

However, if you start in `bar` and find references from there, it will find the original declaration in `foo`.
