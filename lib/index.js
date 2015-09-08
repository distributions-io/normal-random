'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	lcg = require( 'compute-lcg' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var array = require( './array.js' ),
	typedarray = require( './typedarray.js' ),
	arrayarray = require( './arrayarray.js' ),
	matrix = require( './matrix.js' ),
	number = require( './number.js' );


// UNIFORM GENERATOR //

var RAND = lcg();


// NORMAL RANDOM VARIATES //

/**
* FUNCTION: random( [dims][, opts] )
*	Creates a matrix or array filled with normal random numbers.
*
* @param {Number|Number[]} [dims] - dimensions
* @param {Object} [opts] - function options
* @param {Number} [opts.mu=0] - mean parameter
* @param {Number} [opts.sigma=1] - standard deviation
* @param {String} [opts.dtype="generic"] - output data type
* @param {Number} [opts.seed] - integer-valued seed
* @returns {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} random numbers
*/
function random( dims, options ) {
	var opts = {},
		isArray,
		ndims,
		err,
		len,
		mu,
		sigma,
		rand,
		dt;

	if ( arguments.length > 0 ) {
		isArray = isPositiveIntegerArray( dims );
		if ( !isArray && !isPositiveInteger( dims ) ) {
			throw new TypeError( 'random()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
		}
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( opts.seed ) {
		rand = lcg( opts.seed );
	} else {
		rand = RAND;
	}
	dt = opts.dtype || 'generic';

	mu = typeof opts.mu !== 'undefined' ? opts.mu : 0;
	sigma = typeof opts.sigma !== 'undefined' ? opts.sigma : 1;

	if ( arguments.length === 0 ) {
		return number( mu, sigma, rand );
	}
	if ( isArray ) {
		ndims = dims.length;
		if ( ndims < 2 ) {
			len = dims[ 0 ];
		}
	} else {
		ndims = 1;
		len = dims;
	}
	// 1-dimensional data structures...
	if ( ndims === 1 ) {
		if ( len === 1 ) {
			return number( mu, sigma, rand );
		}
		if ( dt === 'generic' ) {
			return array( len, mu, sigma, rand );
		}
		return typedarray( len, dt, mu, sigma, rand );
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			return matrix( dims, dt, mu, sigma, rand );
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
	}
	return arrayarray( dims, mu, sigma, rand );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

Object.defineProperty( module.exports, 'seed', {
	set: function ( newVal ) {
		if ( !isPositiveInteger( newVal ) ) {
			throw new TypeError( 'random()::invalid value. Seed property must be a positive integer. Option: `' + newVal + '`.' );
		}
		RAND = lcg( newVal );
	}
});
