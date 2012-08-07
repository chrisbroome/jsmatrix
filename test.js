var Matrix = require('./matrix');
var rat = require('./rational');

var a = new Matrix( [ [1, 2], [3, 4] ] );
console.log('a: ', a.els);
var b = new Matrix( [ [5, 6], [7, 8] ] );
console.log('b: ', b.els);
var c = a.add(32);
console.log('c: ', c.els);
var d = a.add(b);
console.log('d: ', d.els);
var e = a.multiply( 10 );
console.log('e: ', e.els);
var f = a.multiply( b );
console.log('f: ', f.els);

var g = new Matrix( [ [7, 8, 9], [10, 11, 12] ] );
console.log('g: ', g.els);
var h = a.multiply( g );
console.log('h = ag: ', h.els);

console.log('a.rows(): ', a.rows());
console.log('a.cols(): ', a.cols());

console.log('g.rows(): ', g.rows());
console.log('g.cols(): ', g.cols());

var x = new Matrix( [
  [7, 3, 5, 6],
  [1, 2, 3, 2],
  [8, 4, 3, 3]
] );

console.log('x: ', x.els);

var y = new Matrix( [
  [1, 3, 2, 3, 6],
  [8, 3, 2, 4, 2],
  [2, 6, 2, 3, 7],
  [4, 9, 6, 3, 7]
] );

console.log('y: ', y.els);

var r = x.multiply(y);
console.log('r = xy: ', r.els);

var z = a.concat(g);
console.log('z = a concat g: ', z.els );

function identities( n ) {
  var r = [], i;
  for( i = 0; i <= n; i++ ) {
    r.push(Matrix.identity(i));
  }
  return r;
}

identities(5).map(function(v) {
  console.log(v.els);
});

function gcdTest(a, b) {
  console.log('gcd( %d, %d ) = %d', a, b, rat.gcd(a,b));
}

function ratTest(a, b) {
  console.log('Rational( %d, %d ) = %s', a, b, rat.Rational(a,b));
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
