var
	chalk       = require('chalk'),
	columns     = require('cli-columns'),
	furthermore = require('../index')
	;

function builder() {}

function handler(argv)
{
	furthermore.get(argv.key, function(err, results, children)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		if (results.dir)
		{
			var dirname = (results.key ? results.key : '') + '/';
			console.log(chalk.bold(dirname) + chalk.yellow(' directory listing:'));
			console.log(columns(children));
		}
		else
			console.log(chalk.bold(results.key) + chalk.yellow(' == ') + chalk.blue(results.value));
	});
}

module.exports = {
	command: 'get <key>',
	describe: 'get the value for a key',
	builder: builder,
	handler: handler
};
