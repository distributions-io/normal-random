'use strict';

var random = require( '../lib' ),
	out;

// Set seed
random.seed = 11;

// ---
// Plain arrays...

// 1x10:
out = random( 10 );
console.log( '1x10:' );
console.log( out );
console.log( '\n' );

// 2x1x3:
out = random( [2,1,3] );
console.log( '2x1x3:' );
console.log( out );
console.log( '\n' );

// 5x5x5:
out = random( [5,5,5] );
console.log( '5x5x5:' );
console.log( out );
console.log( '\n' );

// ---
// Typed arrays...
out = random( 10, {
	'dtype': 'float32'
});
console.log( 'Typed arrays:' );
console.log( out );
console.log( '\n' );


// ---
// Matrices...
out = random( [3,2], {
	'dtype': 'float64'
});
console.log( 'Matrix: %s\n', out.toString() );
