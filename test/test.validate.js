/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( validate( {}, values[ i ] ) instanceof TypeError );
		}
	});

	it( 'should return an error if provided a non-numeric `mu` parameter', function test() {
		var values, err;
		 values = [
			'5',
			[],
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'mu': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `sigma` parameter which is not a non-negative number', function test() {
		var values, err;
		values = [
			-2,
			'5',
			[],
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'sigma': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a seed option which is not a positive integer', function test() {
		var values, err;

		values = [
			'5',
			-2,
			2.3,
			new Boolean( true ),
			false,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'seed': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a dtype option which is not a string primitive', function test() {
		var values, err;

		values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'dtype': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return null if all options are valid', function test() {
		var err;

		err = validate( {}, {
			'dtype': 'int32',
			'seed': 23,
			'mu': 3,
			'sigma': 2
		});

		assert.isNull( err );

		err = validate( {}, {
			'beep': true, // misc options
			'boop': 'bop'
		});

		assert.isNull( err );
	});

});
