#!/usr/bin/env node

var yargs = require('yargs')
	.usage('furthermore: manipulate keys on a remote etcd server')
	.version(function() { return require('./package').version; })
	.help('help');

var requireDirectory = require('require-directory'),
	commands = requireDirectory(module, './commands');
Object.keys(commands).forEach(function(c) { yargs.command(commands[c]); });

yargs.argv;
