/*global describe:true, it:true, before:true, after:true, beforeEach: true, afterEach:true */
'use strict';

var
	demand      = require('must'),
	Etcd        = require('node-etcd'),
	sinon       = require('sinon'),
	furthermore = require('./index')
	;

describe('furthermore', () =>
{
	it('exports a bunch of functions', () =>
	{
		var funcs = ['rm', 'get', 'set', 'mkdir', 'rmdir', 'ls', 'all'];
		funcs.forEach(f =>
		{
			furthermore.must.have.property(f);
			furthermore[f].must.be.a.function();
		});
	});

	it('exports a config function that reads rc', () =>
	{
		furthermore.must.have.property('setConfig');
		furthermore.setConfig.must.be.a.function();
		demand(furthermore.etcd).be.undefined();
		furthermore.setConfig();
		furthermore.etcd.must.be.an.object();
		furthermore.etcd.must.be.instanceof(Etcd);
	});

	it('rm() calls etcd.del()', done =>
	{
		var spy = sinon.stub(furthermore.etcd, 'del');
		spy.yields(null, {node: 'yo'});

		furthermore.rm('key', (err, data) =>
		{
			demand(err).not.exist();
			data.must.equal('yo');
			spy.restore();
			done();
		});
	});

	it('get() calls etcd.get()', done =>
	{
		var mock = { dir: false, key: 'key', value: 'value' };
		var spy = sinon.stub(furthermore.etcd, 'get');
		spy.yields(null, { node: mock });

		furthermore.get('key', (err, data) =>
		{
			demand(err).not.exist();
			spy.calledWith('key').must.be.true();
			data.must.eql(mock);
			spy.restore();
			done();
		});
	});

	it('set() calls etcd.set()', done =>
	{
		var mock = { dir: false, key: 'key', value: 'value' };
		var spy = sinon.stub(furthermore.etcd, 'set');
		spy.yields(null, { node: mock });

		furthermore.set('key', 'value', (err, data) =>
		{
			demand(err).not.exist();
			spy.calledWith('key', 'value').must.be.true();
			data.must.eql(mock);
			spy.restore();
			done();
		});
	});

	it('mkdir() calls etcd.mkdir()', done =>
	{
		var mock = { key: '/foo/bar', dir: true, modifiedIndex: 21, createdIndex: 21 };
		var spy = sinon.stub(furthermore.etcd, 'mkdir');
		spy.yields(null, { node: mock });

		furthermore.mkdir('/foo/bar', (err, data) =>
		{
			demand(err).not.exist();
			spy.calledWith('/foo/bar').must.be.true();
			data.must.eql(mock);
			spy.restore();
			done();
		});
	});

	it('rmdir() calls etcd.rmdir()', done =>
	{
		var mock = {
			action: 'delete',
			node: {
				key: '/foo/bar',
				dir: true,
				modifiedIndex: 347,
				createdIndex: 346
			},
			prevNode: {
				key: '/foo/bar',
				dir: true,
				modifiedIndex: 346,
				createdIndex: 346
			}
		};

		var spy = sinon.stub(furthermore.etcd, 'rmdir');
		spy.yields(null, { node: mock });

		furthermore.rmdir('foo/bar', (err, data) =>
		{
			demand(err).not.exist();
			spy.calledWith('foo/bar').must.be.true();
			data.must.eql(mock);
			spy.restore();
			done();
		});
	});

});
