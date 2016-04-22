var
	chalk       = require('chalk'),
	columns     = require('cli-columns'),
	fs          = require('fs'),
	furthermore = require('../index')
	;

function builder(yargs) {}

function safeParse(data)
{
	try { return JSON.parse(data); }
	catch (ex) { return data; }
}

function handler(argv)
{
	furthermore.setConfig(argv.env);

	fs.readFile(argv.json, 'utf8', function(err, data)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		var input = safeParse(data);

		furthermore.all(function(err, current)
		{
			if (err)
				return console.log(chalk.red('error: ') + err.message);

			var missing = [];
			var different = [];

			Object.keys(input).forEach(function(k)
			{
				if (current[k])
				{
					if (current[k] === input[k])
						delete input[k];
					else
						different.push(k);
					delete current[k];
				}
				else
					missing.push(k);
			});

			console.log(chalk.red('missing values:'));
			console.log(columns(missing.sort()));
			console.log(chalk.blue('\nkeys with differing values:'));
			console.log(columns(different.sort()));
			console.log(chalk.yellow('\nextra values:'));
			console.log(columns(Object.keys(current).sort()));
		});
	});
}

module.exports = {
	command: 'reconcile <json>',
	describe: 'report how the keys in the given json file differ from the keys in etcd',
	builder: builder,
	handler: handler
};
