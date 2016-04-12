var
	Etcd = require('node-etcd'),
	rc = require('rc')('etcd', { hosts: '127.0.0.1:4001', ssl: false }, [])
	;

var etcd = new Etcd(
	Array.isArray(rc.hosts) ? rc.hosts : [rc.hosts],
	rc.ssl ? true : undefined
);

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

exports.del = function del(key, callback)
{
	etcd.del(key, function(err, reply)
	{
		if (err) return callback(err);
		callback(null, reply.node);
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

exports.rmdir = function mkdir(dir, callback)
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
