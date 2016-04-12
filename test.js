/*global describe:true, it:true, before:true, after:true, beforeEach: true, afterEach:true */
'use strict';

var
	demand   = require('must'),
	furthermore = require('./index')
	;

describe('furthermore', function()
{
	it('exports one function', function()
	{
		furthermore.must.be.a.function();
	});
});
