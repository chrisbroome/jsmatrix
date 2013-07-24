// @description: creates a matrix from the given 2 dimensional array
function Matrix( els ) {
  if( Array.isArray(els) ) {
    var a = els.slice(0);
    this.a = a;
    this.R = a.length;
    if( this.R > 0 ) {
      this.C = this.a[0].length;
    }
  }
}
Matrix.prototype = addMethods({
  a: [],
  rows: 0,
  cols: 0,
  name: ''
});
Matrix.isMatrix = function(o) {
  return o instanceof Matrix;
}

Matrix.zero = new Matrix();

Matrix.identity = function( n ) {
  if( n < 1 ) return Matrix.zero;
  var m = [], nrow, r, c;
  for( r = 0; r < n; r++ ) {
    nrow = [];
    for( c = 0; c < n; c++ ) {
      nrow.push( r === c ? 1 : 0 );
    }
    m.push( nrow );
  }
  return new Matrix( m );
}

function addMethod( name, func, fmt ) {
  this[name] = func;
  this[name].fmt = fmt;
}

function addMethods( o ) {
  var f = addMethod.bind(o);
  f( 'elements', elements, '{0}' );
  f( 'size', size, '|{0}|' );
  f( 'rows', rows, 'rows' );
  f( 'cols', cols, 'cols' );
  f( 'row', row, 'row{0}' );
  f( 'col', col, 'col{0}' );
  f( 'at', at, '[{0},{1}]' );
  f( 'add', add, '+{0}' );
  f( 'addConstant', addConstant, '+{0}');
  f( 'addMatrix', addMatrix, '+{0}');
  f( 'multiply', multiply, '*{0}' );
  f( 'multiplyConstant', multiplyConstant, '*{0}' );
  f( 'multiplyMatrix', multiplyMatrix, '*{0}' );
  f( 'concat', concat, '&{0}' );
  f( 'flatten', flatten, '' );
  f( 'iterate', iterate, '' );
  f( 'toString', toString, '' );
  return o;
}

// @description: gets the rows
function elements() {
  return this.a.slice();
}

function size() {
  return size;
}

// @description: gets a column vector at the specified row
function row( i ) {
  return this.a[i].slice();
}

// @description: gets a row vector at the specified column
function col( i ) {
  return this.a.map( colSelector.bind(i) ).slice();
}

function colSelector(v) {
  return v[this];
}

// @description: gets the element at the specified row, col
function at( row, col ) {
  return this.a[ row ][ col ];
}

// @description: returns an array of row vectors
function rows() {
  return this.a.slice();
}

// @description: returns an array of column vectors
function cols() {
  var c, x = [];
  for( c = 0; c < this.C; c++ ) {
    x.push( this.col( c ) );
  }
  return x;
}

// @descprition: adds another matrix or constant to this matrix and returns the result
function add( m ) {
  if( typeof m === 'number' ) {
    return this.addConstant( m );
  }
  else if( Matrix.isMatrix( m ) ) {
    return this.addMatrix( m );
  }
  else {
    return m;
  }
}

// @description: multiplies another matrix or constant to this matrix and returns the result
function multiply( m ) {
  if( typeof m === 'number' ) {
    return this.multiplyConstant( m );
  }
  else if( Matrix.isMatrix( m ) ) {
    return this.multiplyMatrix( m );
  }
  else {
    return m;
  }
}

function iterate( cb ) {
  return this.a.map( function( row, r_index ) {
    return row.map( function( value, c_index ) {
        return cb( value, c_index, r_index, row );
      } ).slice();
  } ).slice();
}

function iterateMapRowIteration(x, ci, c) {
  var o = this;
  return o.cb( x, ci, o.ri, c );
}

function iterateMapMatrixIteration(row, ri) {
  var cb = this;
  var o = {cb: cb, ri: ri};
  var f = iterateMapRowIteration.bind(o);
  return row.map(f).slice();
}

function addConstant(n) {
  var f = addConstantIteration.bind(n);
  return new Matrix(this.iterate(f));
}

function addConstantIteration(n) {
  return n + this;
}

function addMatrix( m ) {
  var f = addToMatrixIteration.bind(m);
  return new Matrix(this.iterate(f));
}

function addToMatrixIteration( v, c, r) {
  return v + this.at( r, c );
}

function multiplyConstant( n ) {
  var f = multiplyConstantIteration.bind(n)
  return new Matrix(this.iterate(f));
}

function multiplyConstantIteration( v ) {
  return v * this;
}

function multiplyMatrix( m ) {
  if( this.C !== m.R ) throw new Error('C must equal m.R');
  var f = multiplyMatrixRowIteration.bind(m);
  var x = this.rows().map(f).slice();
  return new Matrix( x );
}

function multiplyMatrixRowIteration( row_r, r ) {
  var f = thisRowVectorDotCol.bind(row_r);
  var x = this.cols().map(f).slice();
  return x;
}

function thisRowVectorDotCol( col_c, c ) {
  var x = vectorDot( this, col_c );
  return x;
}

function vectorDot( v1, v2 ) {
  if( v1.length !== v2.length ) throw new Error('Vectors are not the same size.');
  var f = vectorDotMapIteration.bind(v2);
  var x = v1.map(f).reduce(sumReduceIteration);
  return x;
}

function vectorDotMapIteration(v, k) {
  return v * this[k];
}

function sumReduceIteration(a, i) {
  a += i;
  return a;
}

function concat( m ) {
  if( this.R !== m.R ) throw new Error('Matrices have different number of rows');
  var f = concatMapIteration.bind(m);
  var x = this.rows().map(f).slice();
  return new Matrix( x );
}

function concatMapIteration(row_r, r) {
  return row_r.concat( this.row(r) );
}

function toString() {
  var max = Math.max.apply(null, this.flatten());
  var numDigits = minDigits(max);
  var f = toStringMatrixReduceIteration.bind({numDigits: numDigits});
  return this.rows().reduce(f, '');
}

function toStringMatrixReduceIteration(a, r) {
  var f = toStringRowReduceIteration.bind(this);
  return a + r.reduce(f, '\n');
}

function toStringRowReduceIteration(a, c) {
  return a + ' ' + padString(c, this.numDigits);
}

function minDigits(x) {
  return Math.ceil(Math.log(x) / Math.LN10)
}

function padString(n, width, x) {
  x = x || ' ';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(x) + n;
}

function flatten() {
  return this.a.reduce(flattenReduceIteration, []);
}

function flattenReduceIteration(a,x) {
  return a.concat(x);
}

module.exports = Matrix;

