#!/usr/bin/env node

var updater = require('update-notifier'),
	pkg     = require('./package.json');

updater({pkg: pkg}).notify();

var yargs = require('yargs')
	.usage('furthermore: manipulate keys on a remote etcd server')
	.example('furthermore ls /deploys')
	.example('furthermore mkdir /deploys/website')
	.example('furthermore set /deploys/website/commit bfc8d32')
	.example('furthermore get /deploys/website/commit')
	.example('furthermore get "//deploys/w.*/"')
	.example('furthermore rm /deploys/website/commit')
	.example('furthermore -e staging set canonical-host https://example.com')
	.option('env', {
		alias: 'e',
		description: 'which etcd host group to use',
		default: 'default',
		global: true
	})
	.version()
	.help()
	;

var requireDirectory = require('require-directory'),
	commands = requireDirectory(module, './commands');
Object.keys(commands).forEach(function(c) { yargs.command(commands[c]); });

yargs.argv;
