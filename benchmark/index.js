'use strict';

// MODULES //

var boxMueller = require( './boxmueller.js' ),
	ziggurat = require( './../lib/array.js' );

// VARIABLES //

var len,
	i,
	out,
	res,
	start,
	stop;

// --------------------------------------
// WARM-UP

len = 1e6;
for ( i = 0; i < len; i++ ) {
	i = i;
}

// --------------------------------------
// BENCHMARK

len = 1e7;
res = new Array( 2 );

// Box-Mueller:


start = process.hrtime();
out = boxMueller( len );
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// Ziggurat:

start = process.hrtime();
out = ziggurat( len, 0, 1, Math.random );
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// --------------------------------------
// RESULTS

console.log( 'Box-Mueller:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'Ziggurat:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );
