var
	Etcd = require('node-etcd'),
	rc   = require('rc')('etcd', { hosts: '127.0.0.1:4001', ssl: false }, []),
	etcd
	;

exports.setConfig = function setConfig(env)
{
	var configset = rc[env] || rc;
	etcd = new Etcd(
		Array.isArray(configset.hosts) ? configset.hosts : [configset.hosts],
		configset.ssl ? true : undefined
	);
	exports.etcd = etcd;
};

function cleanDir(dir, nodes)
{
	var patt = new RegExp('^\/?' + dir + '\/?');

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
	var lastSlash = target.lastIndexOf('/');
	if (lastSlash >= 0)
		dir = target.slice(0, lastSlash);
	if (!target.match(/^\//)) target = '/' + target;
	var pattern = new RegExp('^' + target.replace(/\*$/, '.*'));

	etcd.get(dir, function(err, reply)
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
		if (!reply.node.nodes) return callback(null, []);
		callback(null, cleanDir(dir, reply.node.nodes));
	});
};
