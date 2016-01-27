'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isNonNegative = require( 'validate.io-nonnegative' );
var isNumber = require( 'validate.io-number-primitive' );
var isPositiveInteger = require( 'validate.io-positive-integer' );
var isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.mu] - mean parameter
* @param {Number} [options.sigma] - standard deviation
* @param {String} [options.dtype] - output data type
* @param {Number} [options.seed] - integer-valued seed
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'mu' ) ) {
		opts.mu = options.mu;
		if ( !isNumber( opts.mu ) ) {
			return new TypeError( 'invalid option. `mu` parameter must be a number primitive. Option: `' + opts.mu + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sigma' ) ) {
		opts.sigma = options.sigma;
		if ( !isNonNegative( opts.sigma ) ) {
			return new TypeError( 'invalid option. `sigma` parameter must be a non-negative number. Option: `' + opts.sigma + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'seed' ) ) {
		opts.seed = options.seed;
		if ( !isPositiveInteger( opts.seed ) ) {
			return new TypeError( 'invalid option. Seed option must be a positive integer. Option: `' + opts.seed + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
