'use strict';

/**
* FUNCTION randn( length )
*	Creates an `array` of standard normal random variates
*	using the Box-Mueller transform.
*
* @param {Number} length - array length
* @param {Number|Array} standard normal random variates
*/
function randn( length ) {
	var urand, vrand,
	vec = [],
	numValues = length || 1;

	for (var i = 0; i < numValues; i++) {
		urand = Math.random();
		vrand = Math.random();
		vec.push (
			Math.sqrt( -2*Math.log( urand ) ) * Math.cos( 2*Math.PI*vrand )
		);
	}

	if ( numValues === 1 ) {
		return vec[0];
	}
	return vec;
} // end FUNCTION randn()


// EXPORTS //

module.exports = randn;
