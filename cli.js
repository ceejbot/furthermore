#!/usr/bin/env node

var yargs = require('yargs')
	.usage('furthermore: manipulate keys on a remote etcd server')
	.command(require('./commands/get'))
	.command(require('./commands/ls'))
	.command(require('./commands/set'))
	.command(require('./commands/del'))
	.version(function() { return require('./package').version; })
	.help('help');

var requireDirectory = require('require-directory'),
	commands = requireDirectory(module, './commands');
Object.keys(commands).forEach(function(c) { yargs.command(commands[c]); });

yargs.argv;
