/*global describe:true, it:true, before:true, after:true, beforeEach: true, afterEach:true */
'use strict';

var
	demand   = require('must'),
	furthermore = require('./index')
	;

describe('furthermore', function()
{
	it('exports a bunch of functions', function()
	{
		var funcs = ['del', 'get', 'set', 'mkdir', 'rmdir', 'ls' ];
		funcs.forEach(function(f)
		{
			furthermore.must.have.property(f);
			furthermore[f].must.be.a.function();
		});
	});
});
