'use strict';

// MODULES //

var ln = require( 'math-ln' );


// NORMAL TAIL //

/**
* FUNCTION dRanNormalTail( dMin, iNegative, rand )
*	Transform the tail of the normal distribution to
*	the unit interval and then use rejection technique
*	to generate standar normal variable.
*	Reference:
*		Marsaclia, G. (1964). Generating a Variable from the Tail
*		of the Normal Distribution. Technometrics, 6(1),
*		101–102. doi:10.1080/00401706.1964.10490150
*
* @param {Number} dMin - start value of the right tail
* @param {Boolean} iNegative - boolean indicating which side to evaluate
* @param {Function} rand - random number generator
* @returns {Number} standard normal variable
*/
function dRanNormalTail( dMin, iNegative, rand ) {
	var x, y;
	do {
		x = ln( rand() ) / dMin;
		y = ln( rand() );
	} while ( -2 * y < x * x );
	return iNegative ? x - dMin : dMin - x;
} // end FUNCTION dRanNormalTail()


// EXPORTS //

module.exports = dRanNormalTail;
