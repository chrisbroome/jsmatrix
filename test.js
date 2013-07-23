var Matrix = require('./matrix');
var rat = require('./rational');

function matrixTests() {
  function setup() {
    var m = {
      a: new Matrix([
        [1, 2],
        [3, 4]
      ]),
      b: new Matrix([
        [5, 6],
        [7, 8]
      ]),
      g: new Matrix([
        [ 7,  8,  9],
        [10, 11, 12]
      ]),
      x: new Matrix([
        [7, 3, 5, 6],
        [1, 2, 3, 2],
        [8, 4, 3, 3]
      ]),
      y: new Matrix([
        [1, 3, 2, 3, 6],
        [8, 3, 2, 4, 2],
        [2, 6, 2, 3, 7],
        [4, 9, 6, 3, 7]
      ]),
      z: new Matrix([
        [ 1,  2,  3,  4,  5],
        [ 6,  7,  8,  9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
      ])
    };
    return m;
  }

  function output( desc, m, func, lhs, rhs ) {
    function valOrName( o ) {
      return typeof o !== 'undefined' && typeof o.name === 'string' ? o.name : o;
    }
    // var f = func.fmt.slice();
    // var i = f.replace('{0}', valOrName(lhs)).replace('{1}', valOrName(rhs));
    // if( typeof rhs !== 'undefined' ) {
    //   console.log( i + ': ', lhs[func]( rhs ) );
    // } else {
    //   console.log( i + ': ', lhs[func]() );
    // }

    console.log( desc + ' = ', m.toString() );
  }

  function identities( n ) {
    var r = [], i;
    for( i = 0; i <= n; i++ ) {
      r.push( Matrix.identity( i ) );
    }
    return r;
  }

  function run() {
    var matrices = setup();

    var a = matrices.a;
    var b = matrices.b;
    var g = matrices.g;
    var x = matrices.x;
    var y = matrices.y;
    var z = matrices.z;

    output( 'a', a );
    output( 'b', b );
    output( 'a + 32', a.add( 32 ) );
    output( 'a * 10', a.multiply( 10 ) );
    output( 'a + b', a.add( b ) );
    output( 'a * b', a.multiply( b ) );
    output( 'g', g );
    output( 'a * g', a.multiply( g ) );
    output( 'x', x );
    output( 'y', y );
    output( 'z', z );
    output( 'x * y', x.multiply( y ) );
    output( 'a & g', a.concat( g ) );

    identities(5).map( function( v, k ) {
      output('I('+k+')', v );
    } );

    var i5 = Matrix.identity(5);
    output( 'z * I(5)', z.multiply(i5) );
    output( 'I(5) * z', i5.multiply(z) );
    output( 'z * z', z.multiply( z ) );
    output( 'y * z', y.multiply( z ) );
  }

  run();
}

function rationalTests() {
  function gcdTest( a, b ) {
    console.log('gcd( %d, %d ) = %d', a, b, rat.gcd( a,b ) );
  }

  function ratTest( a, b ) {
    console.log('Rational( %d, %d ) = %s', a, b, rat.Rational( a,b ) );
  }

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
    gcdTest( a, b );
  });

  pairs.forEach( function( p ) {
    var a = p[0], b = p[1];
    ratTest( a, b );
  });
}

function run() {
  matrixTests();
  rationalTests();
}

run();
