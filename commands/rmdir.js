var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.setConfig(argv.env);
	furthermore.rmdir(argv.dir, (err, results) =>
	{
		furthermore._handleError(err);

		console.log(chalk.bold(results.key + '/') + chalk.red(' ✘ removed'));
	});
}

module.exports = {
	command: 'rmdir <dir>',
	describe: 'remove the named directory',
	builder,
	handler
};
