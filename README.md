Normal Random Variables
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a [matrix](https://github.com/dstructs/matrix) or array filled with draws from a [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).


## Installation

``` bash
$ npm install distributions-normal-random
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var random = require( 'distributions-normal-random' );
```

#### random( [dims][, opts] )

Creates a [`matrix`](https://github.com/dstructs/matrix) or [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) filled with draws from a [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution). The `dims` argument may either be a positive `integer` specifying a `length` or an `array` of positive `integers` specifying dimensions. If no `dims` argument is supplied,the function returns a single random draw from a [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).

``` javascript
var out;

// Set seed
random.seed = 2;

out = random( 5 );
// returns [ ~-0.832, ~0.735, ~-1.432, ~0.057, -0.13 ]

out = random( [2,1,2] );
// returns [ [ [~0.969,~-0.394] ], [ [~0.599,~-1.511] ] ]

```

The function accepts the following `options`:

*	__mu__: mean parameter. Default: `0`.
*	__sigma__: standard deviation. Default: `1`.
*	__seed__: positive integer used as a seed to initialize the generator. If not supplied, uniformly distributed random numbers are generated via an underlying generator seedable by setting the `seed` property of the exported function.
*	__dtype__: output data type (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types). Default: `generic`.

The [normal](https://en.wikipedia.org/wiki/Normal_distribution) distribution is a function of two parameters: `mu`(mean) and `sigma > 0`(standard deviation). By default, `mu` is equal to `0` and `sigma` is equal to `1`. To adjust either parameter, set the corresponding option.

``` javascript
var out = random( 5, {
	'mu': 20,
	'sigma': 4,
});
// returns [ ~25.293, ~21.105, ~21.347, 22.57, ~18.726 ]

```

To be able to reproduce the generated random numbers, set the `seed` option to a positive integer.

``` javascript
var out = random( 3, {
	'seed': 22
});
// returns [ ~-0.643, ~0.937, ~0.049 ]

var out = random( 3, {
    'seed': 22
});
// returns [ ~-0.643, ~0.937, ~0.049 ]

```

If no `seed` option is supplied, each function call uses a common underlying uniform number generator. A positive-integer seed for this underlying generator can be supplied by setting the seed property of the exported function.

```javascript
random.seed = 11;
var out = random();
// returns ~-0.921

var out = random();
// returns ~0.389

random.seed = 11;
var out = random();
// returns ~-0.921

var out = random();
// returns ~0.389

```

By default, the output data structure is a generic [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). To output a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), set the `dtype` option.

``` javascript
var out;

out = random( 5, {
	'dtype': 'float32'
});
// returns Float32Array( [~0.166,~0.916,~-0.003,-0.08,~-2.608] )

out = random( [3,2], {
	'dtype': 'float64'
});
/*
	[ ~-0.482 ~0.274
	  ~0.725 ~1.113
	  ~0.608 1.05 ]
*/

```

__Notes__:
*	Currently, for more than `2` dimensions, the function outputs a __generic__ `array` and ignores any specified `dtype`.

	``` javascript
	var out = random( [2,1,3], {
		'dtype': 'float32'
	});
	// returns [ [ [~0.873,~-0.510,~-0.370] ], [ [~0.393,~-0.233,~0.907] ] ]

	```

## Method

The used algorithm to generate normal random variables is the "Improved Ziggurat method" developed by J. Doornik. In a speed comparison of different algorithms, Doornik found that the Ziggurat method was two or three times faster than the commonly used polar method ([Box-Mueller Transform](https://en.wikipedia.org/wiki/Box-Muller_transform)) when generating `10^9` standard normal random numbers.

Reference:
> Doornik, J. a. (2005).
> An Improved Ziggurat Method to Generate Normal Random Samples.


## Examples

``` javascript
var random = require( 'distributions-normal-random' ),
	out;

// Set seed
random.seed = 11;

// Plain arrays...

// 1x10:
out = random( 10 );

// 2x1x3:
out = random( [2,1,3] );

// 5x5x5:
out = random( [5,5,5] );

// 10x5x10x20:
out = random( [10,5,10,20] );

// Typed arrays...
out = random( 10, {
	'dtype': 'float32'
});

// Matrices...
out = random( [3,2], {
	'dtype': 'float64'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015-2016. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-normal-random.svg
[npm-url]: https://npmjs.org/package/distributions-normal-random

[travis-image]: http://img.shields.io/travis/distributions-io/normal-random/master.svg
[travis-url]: https://travis-ci.org/distributions-io/normal-random

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/normal-random/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/normal-random?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/normal-random.svg
[dependencies-url]: https://david-dm.org/distributions-io/normal-random

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/normal-random.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/normal-random

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/normal-random.svg
[github-issues-url]: https://github.com/distributions-io/normal-random/issues
