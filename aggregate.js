const fs = require('fs');
const _ = require('lodash');
const {range} = _;
function pad(val) {
    return _.pad(val, 10);
}
function row(vals) {
    return vals.map(val => _.pad(val, 10)).join(' | ');
}

const results = fs.readdirSync('.').filter(v => v.match(/^log-/)).map(v => {
    const numbers = fs.readFileSync(v, 'utf8').split('\n').map(v => +v);
    return {
        name: v,
        runs: numbers,
        average: numbers.reduce((a, n) => a + n, 0) / numbers.length
    };
});

console.log(`
${ row(results.map(v => v.name)) } 
${ range(0, 9).map(iRun => {
    results.map(v => v.runs[iRun])
}).join('\n') }
${ row(results.map(v => 'Avg')) } 
${ row(results.map(v => v.average)) } 
`);
