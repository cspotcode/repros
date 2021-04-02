// BUG: "Go to definition" on foo shows "no definition found for foo"
// TS 4.0.5 bug: "Go to definition" links to the first `foo` in `exports.foo = foo;`, whereas I believe it should link to `async function foo` to match .ts checking behavior.
// GOOD: "Find references" includes `exports.foo = foo;` from libfoo.js
// BUG: "Find references" does not include `async function foo` nor `foo()` from libfoo.js
const {foo} = require('./libfoo');

// GOOD: "Go to definition" on foo jumps to `async function foo` in libfoo.js
// GOOD: "Find references" includes `exports.foo = foo;`
// BUG: "Find references" does not include `async function foo` nor `foo()` from libfoo.js
foo();