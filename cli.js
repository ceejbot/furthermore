#!/usr/bin/env node

var chalk = require('chalk');
var argv = require('yargs')
	.usage('furthermore: manipulate keys on a remote etcd server')
	.command(require('./commands/get'))
	.command(require('./commands/ls'))
	.command(require('./commands/set'))
	.command(require('./commands/del'))
	.version()
	.help()
	.argv;
