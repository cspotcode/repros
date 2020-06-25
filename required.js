require('mocha').reporters['custom-reporter'] = CustomReporter;

let Base, log, logError;
Base = require('mocha').reporters.Base;

function CustomReporter(runner, options) {
	Base.call(this, runner);
    for(const event of ['suite', 'suite end', 'test', 'test end', 'hook', 'hook end', 'fail']) {
        runner.on(event, function (test) {
            const {title, originalTitle, type} = test;
            console.dir({event, title, originalTitle, type});
        });
    }
};
