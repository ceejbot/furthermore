var
	chalk = require('chalk'),
	furthermore = require('../index')
	;


function builder()
{

}

function handler(argv)
{
	furthermore.del(argv.key, function(err, results)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		console.log(results);
	});
}

module.exports = {
	command: 'del <key>',
	describe: 'remove a key',
	builder: builder,
	handler: handler
};
