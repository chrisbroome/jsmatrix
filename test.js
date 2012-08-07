var Matrix = require('./matrix');

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

identities(10).map(function(v) {
  console.log(v.els);
});
