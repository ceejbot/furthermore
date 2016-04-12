var
	chalk       = require('chalk'),
	columns     = require('cli-columns'),
	furthermore = require('../index')
	;

function builder() {}

function getMatch(key)
{
	furthermore.getMatch(key, function(err, results)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		console.log(chalk.bold(key) + chalk.yellow(' matches:'));
		results.forEach(function(r)
		{
			console.log(chalk.bold(r.key) + chalk.yellow(' == ') + chalk.blue(r.value));
		});
	});
}

function handler(argv)
{
	furthermore.setConfig(argv.env);

	if (/\*$/.test(argv.key))
		return getMatch(argv.key);

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
	describe: 'get the value for a key; end the key with * to see all keys that start with the prefix',
	builder: builder,
	handler: handler
};
