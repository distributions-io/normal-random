'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' );
var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( dims, dt, mu, sigma[, rand] )
*	Creates a matrix of normally distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Matrix} matrix filled with normal random numbers
*/
function random( dims, dt, mu, sigma, rand ) {
	var out;
	var draw;
	var i;

	draw = partial( mu, sigma, rand );
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
