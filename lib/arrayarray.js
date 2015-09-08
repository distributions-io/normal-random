'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, mu, sigma[, rand] )
*	Creates a multidimensional array of normally distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with normal random numbers
*/
function random( dims, mu, sigma, rand ) {
	var draw = partial( mu, sigma, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
