var
	chalk       = require('chalk'),
	columns     = require('cli-columns'),
	furthermore = require('../index')
	;

function builder(yargs)
{
	return yargs.option('raw', {
		alias: 'r',
		desc: 'Write just the raw value to stdout?',
		type: 'boolean'
	});
}

function getMatch(key)
{
	key = key.replace(/^\/(.*)\/$/, '$1');

	furthermore.getMatch(key, (err, results) =>
	{
		furthermore._handleError(err);

		if (Object.keys(results).length === 0)
		{
			console.log(chalk.bold(key) + chalk.yellow(' has no matches.'));
			return;
		}

		console.log(chalk.bold(key) + chalk.yellow(' matches:'));
		var lines = [];
		results.forEach(r =>
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

	furthermore.get(argv.key, (err, results, children) =>
	{
		furthermore._handleError(err);

		if (results.dir)
		{
			var dirname = (results.key ? results.key : '') + '/';
			console.log(chalk.bold(dirname) + chalk.yellow(' directory listing:'));
			console.log(columns(children));
		}
		else
		{
			if (argv.raw)
			{
				process.stdout.write(results.value);
			}
			else
			{
				console.log(chalk.bold(results.key) + chalk.yellow(' == ') + chalk.blue(results.value));
			}
		}
	});
}

module.exports = {
	command: 'get <key>',
	describe: 'get the value for a key; wrap the key in // to treat it as a regexp',
	builder,
	handler
};
