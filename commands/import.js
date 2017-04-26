var
	chalk       = require('chalk'),
	fs          = require('fs'),
	furthermore = require('../index')
	;

function builder(yargs) {}

function safeParse(data)
{
	try { return JSON.parse(data); }
	catch (err) { return data; }
}

function handler(argv)
{
	furthermore.setConfig(argv.env);

	fs.readFile(argv.json, 'utf8', (err, data) =>
	{
		furthermore._handleError(err);

		var input = safeParse(data);

		var keys = Object.keys(input).sort();
		keys.forEach(k =>
		{
			furthermore.set(k, input[k], (err, results) =>
			{
				furthermore._handleError(err);

				console.log(chalk.bold(results.key) + chalk.yellow(' ➜ ') + chalk.blue(results.value));
			});
		});
	});
}

module.exports = {
	command: 'import <json>',
	describe: 'import key/value pairs from a json file & set them in etcd',
	builder,
	handler
};
