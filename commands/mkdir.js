var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.setConfig(argv.env);
	furthermore.mkdir(argv.dir, function(err, results)
	{
		if (err)
		{
			console.error(chalk.red('error: ') + err.message);
			process.exit(1);
		}

		console.log(chalk.bold(results.key + '/') + chalk.yellow(' ➜ created'));
	});
}

module.exports = {
	command: 'mkdir <dir>',
	describe: 'create the named directory, recursively',
	builder: builder,
	handler: handler
};
