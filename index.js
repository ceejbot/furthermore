var
	chalk = require('chalk'),
	Etcd  = require('node-etcd'),
	rc    = require('rc')('etcd', { hosts: '127.0.0.1:4001', ssl: false }, []),
	etcd
	;

exports.setConfig = function setConfig(env)
{
	var configset = rc[env] || rc;
	if (!Array.isArray(configset.hosts)) configset.hosts = [configset.hosts];
	configset.hosts = configset.hosts.map(function(h)
	{
		return (configset.ssl ? 'https://' : 'http://') + h;
	});

	etcd = new Etcd(configset.hosts);
	exports.etcd = etcd;
};

function cleanDir(dir, nodes)
{
	var patt = new RegExp('^/?' + dir + '/?');

	var result = [];
	nodes.forEach(function(child)
	{
		var k = child.key.replace(patt, '');
		if (child.dir) k += '/';
		result.push(k);
	});

	return result;
}

exports.rm = function del(key, callback)
{
	etcd.del(key, function(err, reply)
	{
		if (err) return callback(err);
		callback(null, reply.node);
	});
};

exports.getMatch = function getMatch(target, callback)
{
	var dir = '/';
	var pattern = new RegExp(target);
	var lastSlash = target.lastIndexOf('/');
	if (lastSlash >= 0)
		dir = target.slice(0, lastSlash);

	etcd.get(dir, { recursive: true }, function(err, reply)
	{
		if (err) return callback(err);
		if (!reply.node.nodes) return callback(null, []);

		var results = [];
		reply.node.nodes.forEach(function(n)
		{
			if (pattern.test(n.key)) results.push(n);
		});

		callback(null, results);
	});
};

exports.get = function get(key, callback)
{
	etcd.get(key, { recursive: true }, function(err, reply)
	{
		if (err) return callback(err);
		if (reply.node.dir)
			return callback(null, reply.node, cleanDir(key, reply.node.nodes));
		callback(null, reply.node);
	});
};

function toObject(node)
{
	var r = {};
	if (!node.nodes) return r;

	node.nodes.forEach(function(childNode)
	{
		var split = childNode.key.split('/');
		var key = split[split.length - 1];

		if (childNode.dir)
			r[key] = toObject(childNode);
		else
			r[key] = childNode.value;
	});

	return r;
}

exports.all = function all(callback)
{
	etcd.get('/', { recursive: true }, function(err, reply)
	{
		if (err) return callback(err);
		callback(null, toObject(reply.node));
	});
};

exports.mkdir = function mkdir(dir, callback)
{
	etcd.mkdir(dir, { recursive: true }, function(err, reply)
	{
		if (err) return callback(err);
		callback(null, reply.node);
	});
};

exports.rmdir = function rmdir(dir, callback)
{
	etcd.rmdir(dir, function(err, reply)
	{
		if (err) return callback(err);
		callback(null, reply.node);
	});
};

exports.set = function set(key, value, callback)
{
	etcd.set(key, value, function(err, reply)
	{
		if (err) return callback(err);
		callback(null, reply.node);
	});
};

exports.ls = function ls(dir, callback)
{
	etcd.get(dir, function(err, reply)
	{
		if (err) return callback(err, []);
		if (!reply.node || !reply.node.nodes) return callback(null, []);
		callback(null, cleanDir(dir, reply.node.nodes));
	});
};

exports._handleError = function _handleError(err)
{
	if (!err) return;
	console.error(chalk.red('error: ') + err.message);
	process.exit(1);
};
