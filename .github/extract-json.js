#!/usr/bin/env node
const fs = require('fs');
const stdin = fs.readFileSync(0, 'utf8');
console.dir(
    process.argv.slice(2).reduce(
        (json, prop) => json[prop],
        JSON.parse(
            stdin
        )
    )
);