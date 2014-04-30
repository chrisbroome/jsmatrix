var rat = require('../lib/rational');

function rationalTests() {
  var pairs = [
    [ 142, 22 ],
    [ 40, 35 ],
    [ 77, 30 ],
    [ 5325123533, 5325123533 ],
    [ 5325123530, 123442 ],
    [ 2*3*5*7, 5*7*11*13 ],
    [ 1989, 867 ],
    [ 2*3*5*7*11*13*17, 11*13*17 ],
    [ 364117.4207441509, 241980.82787916064 ]
  ];

  pairs.forEach( function( p ) {
    var a = p[0], b = p[1];
    gcdTest(a, b);
  });

  pairs.forEach( function( p ) {
    var a = p[0], b = p[1];
    ratTest(a, b);
  });
}

function gcdTest(a, b) {
  console.log('gcd(%d,%d) = %d', a, b, rat.gcd( a,b ) );
}

function ratTest(a, b) {
  console.log('Rational(%d,%d) = %s', a, b, rat.Rational( a,b ) );
}

function run() {
  rationalTests();
}

run();
