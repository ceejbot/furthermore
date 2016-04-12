var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.setConfig(argv.env);
	furthermore.set(argv.key, argv.value, function(err, results)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		console.log(chalk.bold(results.key) + chalk.yellow(' ➜ ') + chalk.blue(results.value));
	});
}

module.exports = {
	command: 'set <key> <value>',
	describe: 'set a key to a new value',
	builder: builder,
	handler: handler
};
