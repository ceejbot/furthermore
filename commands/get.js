var
	chalk       = require('chalk'),
	columns     = require('cli-columns'),
	furthermore = require('../index')
	;

function builder() {}

function getMatch(key)
{
	key = key.replace(/^\/(.*)\/$/, '$1');

	furthermore.getMatch(key, function(err, results)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		if (!Object.keys(results).length)
		{
			console.log(chalk.bold(key) + chalk.yellow(' has no matches.'));
			return;
		}

		console.log(chalk.bold(key) + chalk.yellow(' matches:'));
		var lines = [];
		results.forEach(function(r)
		{
			lines.push(chalk.bold(r.key) + chalk.yellow(' == ') + chalk.blue(r.value));
		});
		lines.sort();
		console.log(lines.join('\n'));
	});
}

function handler(argv)
{
	furthermore.setConfig(argv.env);

	if (/^\/.*\/$/.test(argv.key))
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
	describe: 'get the value for a key; wrap the key in // to treat it as a regexp',
	builder: builder,
	handler: handler
};
