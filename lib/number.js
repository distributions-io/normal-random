'use strict';

// MODULES //

var dRanNormalTail = require( './dRanNormalTail.js' );
var abs = require( 'math-abs' );
var exp = require( 'math-exp' );
var log = require( 'math-ln' );
var pow = require( 'math-power' );
var sqrt = require( 'math-sqrt' );


// CONSTANTS //

var TWO_P_32 = pow( 2, 32);
var ZIGNOR_C = 128; /* number of blocks */
var ZIGNOR_R = 3.442619855899; /* start of the right tail *
/* (R * phi(R) + Pr(X>=R)) * sqrt(2\pi) */
var ZIGNOR_V = 9.91256303526217e-3;

// GENERATE NORMAL RANDOM NUMBERS //

/**
* FUNCTION random( mu, sigma[, rand] )
*	Generates a random draw from a normal distribution
*	with parameters `mu` and `sigma`. Implementation
*	of the "Improved Ziggurat Method" by J. Doornik.
*	Reference:
*		Doornik, J. a. (2005).
*		An Improved Ziggurat Method to Generate Normal Random Samples.
*
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( mu, sigma, rand ) {
	if ( !rand ) {
		rand = Math.random;
	}

	/* s_adZigX holds coordinates, such that each rectangle has
		same area; s_adZigR holds s_adZigX[i + 1] / s_adZigX[i] */
	var s_adZigX = new Array( ZIGNOR_C + 1 );
	var s_adZigR = new Array( ZIGNOR_C );
	var i;
	var f;

	f = exp( -0.5 * ZIGNOR_R * ZIGNOR_R );
	s_adZigX[0] = ZIGNOR_V / f; /* [0] is bottom block: V / f(R) */
	s_adZigX[1] = ZIGNOR_R;
	s_adZigX[ZIGNOR_C] = 0;
	for ( i = 2; i < ZIGNOR_C; i++ ) {
		s_adZigX[i] = sqrt( -2 * log( ZIGNOR_V / s_adZigX[i - 1] + f ) );
		f = exp( -0.5 * s_adZigX[i] * s_adZigX[i] );
	}
	for ( i = 0; i < ZIGNOR_C; i++ ) {
		s_adZigR[i] = s_adZigX[i + 1] / s_adZigX[i];
	}
	var x, u, f0, f1;
	for (;;) {
		u = 2 * rand() - 1;
		i = TWO_P_32 * rand() & 0x7F;
		/* first try the rectangular boxes */
		if ( abs(u) < s_adZigR[i] ) {
			return mu + sigma * u * s_adZigX[i];
		}
		/* bottom box: sample from the tail */
		if ( i === 0 ) {
			return mu + sigma * dRanNormalTail( ZIGNOR_R, u < 0, rand );
		}
		/* is this a sample from the wedges? */
		x = u * s_adZigX[i];
		f0 = exp( -0.5 * ( s_adZigX[i] * s_adZigX[i] - x * x ) );
		f1 = exp( -0.5 * ( s_adZigX[i+1] * s_adZigX[i+1] - x * x ) );
		if ( f1 + rand() * (f0 - f1) < 1.0 ) {
			return mu + sigma * x;
		}
	}
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
