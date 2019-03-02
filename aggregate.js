const fs = require('fs');
const _ = require('lodash');
const {range} = _;
function pad(val) {
    return _.pad(val, 18);
}
function row(vals) {
    return vals.map(val => pad(val)).join(' | ');
}

const results = fs.readdirSync('.').filter(v => v.match(/^log-/)).map(v => {
    const numbers = fs.readFileSync(v, 'utf8').split('\n').filter(v => v != '').map(v => +v);
    return {
        name: v.replace(/^log-/, ''),
        runs: numbers,
        average: numbers.reduce((a, n) => a + n, 0) / numbers.length
    };
});

console.log(`
${ row(results.map(v => v.name)) } 
${ range(0, 9).map(iRun => {
    return row(results.map(v => v.runs[iRun]))
}).join('\n') }
${ row(results.map(v => 'Avg')) } 
${ row(results.map(v => Math.round(v.average))) } 
`);
