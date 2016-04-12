var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.setConfig(argv.env);
	furthermore.rmdir(argv.dir, function(err, results)
	{
		if (err)
		{
			console.error(chalk.red('error: ') + err.message);
			process.exit(1);
		}

		console.log(chalk.bold(results.key + '/') + chalk.red(' ✘ removed'));
	});
}

module.exports = {
	command: 'rmdir <dir>',
	describe: 'remove the named directory',
	builder: builder,
	handler: handler
};
