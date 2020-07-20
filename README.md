# dts-bundle-generator repro

Input is `src/index.d.ts`  
Output is `dist/index.d.ts`

```bash
npm install
npm run repro
```

*The script above is extracted, executed by bash in docker, and stdout is inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/76710127)

```output
++ echo Hello 'world!'
Hello world!
```
