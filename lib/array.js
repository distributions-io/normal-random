'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, mu, sigma[, rand] )
*	Creates an array of normally distributed random numbers.
*
* @param {Number} len - array length
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number[]} array filled with normal random numbers
*/
function random( len, mu, sigma, rand ) {
	var out,
		draw,
		i;

	draw = partial( mu, sigma, rand );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
