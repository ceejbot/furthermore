#!/usr/bin/env node

var chalk = require('chalk');
var argv = require('yargs')
	.usage('usage here')
	.command(require('./commands/get'))
	.command(require('./commands/ls'))
	.command(require('./commands/set'))
	.command(require('./commands/del'))
	.version(function() { return require('./package').version; })
	.help('help')
	.argv;
