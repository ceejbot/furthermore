var
	chalk = require('chalk'),
	furthermore = require('../index')
	;


function builder()
{

}

function handler(argv)
{
	furthermore.get(argv.key, function(err, results)
	{
		if (err)
			return console.log(chalk.red('error: ') + err.message);

		console.log(results);
	});
}

module.exports = {
	command: 'get <key>',
	describe: 'get the value for a key',
	builder: builder,
	handler: handler
};
