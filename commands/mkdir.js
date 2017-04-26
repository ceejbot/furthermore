var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.setConfig(argv.env);
	furthermore.mkdir(argv.dir, (err, results) =>
	{
		furthermore._handleError(err);

		console.log(chalk.bold(results.key + '/') + chalk.yellow(' ➜ created'));
	});
}

module.exports = {
	command: 'mkdir <dir>',
	describe: 'create the named directory, recursively',
	builder,
	handler
};
