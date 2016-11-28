var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.setConfig(argv.env);
	furthermore.rm(argv.key, function(err, results)
	{
		furthermore._handleError(err);

		console.log(chalk.bold(results.key) + chalk.red(' ✘ '));
	});
}

module.exports = {
	command: 'rm <key>',
	describe: 'remove a key',
	builder: builder,
	handler: handler
};
