var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.setConfig(argv.env);
	furthermore.del(argv.key, function(err, results)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		console.log(chalk.bold(results.key) + chalk.red(' ✘ '));
	});
}

module.exports = {
	command: 'rm <key>',
	describe: 'remove a key',
	builder: builder,
	handler: handler
};
