var
	chalk       = require('chalk'),
	furthermore = require('../index'),
	visit       = require('visit-values')
	;

function builder(yargs)
{
	return yargs.demand(1, 'need a pattern to grep for e.g. foo or /foo/');
}

function handler(argv)
{
	furthermore.setConfig(argv.env);

	var pattern = argv.pattern;

	if (/^\/.*\/$/.test(argv.pattern))
		pattern = pattern.replace(/^\/(.*)\/$/, '$1');

	var regexp = new RegExp(pattern);

	furthermore.all((err, all) =>
	{
		furthermore._handleError(err);

		var lines = [];

		visit(all, (value, key, parent) =>
		{
			if (regexp.test(value))
			{
				lines.push(chalk.bold(key) + chalk.yellow(' == ') + chalk.blue(value));
			}
		});

		if (lines.length > 0)
		{
			lines.sort();
			console.log(chalk.bold(pattern) + chalk.yellow(' matches:'));
			console.log(lines.join('\n'));
		}
		else
		{
			console.log(chalk.bold(pattern) + chalk.yellow(' has no matches.'));
		}
	});
}

module.exports = {
	command: 'grep <pattern>',
	describe: 'search for values matching the given regexp pattern',
	builder,
	handler
};
