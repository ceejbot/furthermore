var
	chalk       = require('chalk'),
	columns     = require('cli-columns'),
	furthermore = require('../index')
	;

function builder(yargs) {}

function handler(argv)
{
	furthermore.setConfig(argv.env);

	furthermore.ls(argv.dir, function(err, results)
	{
		furthermore._handleError(err);

		var dirname = argv.dir + (/\/$/.test(argv.dir) ? '' : '/');
		console.log(chalk.bold(dirname) + chalk.yellow(' directory listing:'));
		console.log(columns(results));
	});
}

module.exports = {
	command: 'ls <dir>',
	describe: 'get a directory listing',
	builder: builder,
	handler: handler
};
