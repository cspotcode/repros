#!/usr/bin/env node
let [,, input, regexp, regexpOptions = '', group = 0] = process.argv;
group = +group;
require('fs').writeSync(1, input.match(new RegExp(regexp, regexpOptions))[group]);
