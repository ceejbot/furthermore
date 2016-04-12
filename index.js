var
	Etcd      = require('node-etcd'),
	rc   = require('rc')('renv',  {
			hosts: '127.0.0.1:4001',
			ssl:   false
		}, [])
	;

var etcd = new Etcd(
	Array.isArray(rc.hosts) ? rc.hosts : [rc.hosts],
	rc.ssl ? true : undefined
);

exports.get = function get(key, callback)
{
	etcd.get(key, { recursive: true }, function(err, reply)
	{
		if (err) return callback(err);
		callback(null, reply.node);
	});
};

exports.del = function del(key, callback)
{
	etcd.del(key, function(err, reply)
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
		if (err) return callback(err);
		var result = [];
		reply.node.nodes.forEach(function(child)
		{
			result.push(child.key);
		});
		callback(null, result);
	});
};
