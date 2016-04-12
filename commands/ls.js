var
	chalk = require('chalk'),
	furthermore = require('../index')
	;

function builder(yargs)
{
}

function handler(argv)
{
	furthermore.ls(argv.dir, function(err, results)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		console.log(results);
	});
}

module.exports = {
	command: 'ls <dir>',
	describe: 'get a directory listing',
	builder: builder,
	handler: handler
};
