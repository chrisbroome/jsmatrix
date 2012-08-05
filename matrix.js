// @description: creates a matrix from the given 2 dimensional array
function Matrix( els ) {
  var a = els.slice(),
      size = {
        rows: a.length,
        cols: a[0].length
      };

  this.els = a;
  this.size = size;
  this.row = row;
  this.col = col;
  this.at = at;
  this.rows = rows;
  this.cols = cols;
  this.add = add;
  this.multiply = multiply;

  // @description: gets a column vector at the specified row
  function row( i ) {
    return a[ i ].slice();
  }

  // @description: gets a row vector at the specified column
  function col( i ) {
    return a.map( function(v) { return v[i]; } ).slice();
  }

  // @description: gets the element at the specified row, col
  function at( row, col ) {
    return a[ row ][ col ];
  }

  // @description: returns an array of row vectors
  function rows() {
    return a.slice();
  }

  // @description: returns an array of column vectors
  function cols() {
    var c, x = [];
    for( c = 0; c < size.cols; c++ ) {
      x.push( col(c) );
    }
    return x;
  }

  // @descprition: adds another matrix or constant to this matrix and returns the result
  function add( m ) {
    if( typeof m === 'number' ) {
      return add_constant( m );
    }
    else if( typeof m === 'object' && m.constructor === Matrix ) {
      return add_matrix( m );
    }
    else {
      return m;
    }
  }

  // @description: multiplies another matrix or constant to this matrix and returns the result
  function multiply( m ) {
    if( typeof m === 'number' ) {
      return multiply_constant( m );
    }
    else if( typeof m === 'object' && m.constructor === Matrix ) {
      return multiply_matrix( m );
    }
    else {
      return m;
    }
  }

  function iterate( cb ) {
    return a.map( function( row, r_index ) {
      return row.map( function( value, c_index ) {
          return cb( value, c_index, r_index, row );
        } ).slice();
    } ).slice();
  }

  function add_constant( n ) {
    return new Matrix(
      iterate( function( v ) {
        return v + n;
      } )
    );
  }

  function add_matrix( m ) {
    return new Matrix(
      iterate( function( v, c, r, row ) {
        return v + m.at( r, c );
      } )
    );
  }

  function multiply_constant( n ) {
    return new Matrix(
      iterate( function( v ) {
        return v * n;
      } )
    );
  }

  function multiply_matrix( m ) {
    if( size.cols != m.size.rows ) throw new Error('size.cols must equal m.size.rows');
    var x = rows().map( function( row_r, r ) {
      return m.cols().map( function( col_c, c ) {
        return vector_dot( row_r, col_c );
      }).slice();
    }).slice();
    return new Matrix( x );
  }

  function vector_dot( v1, v2 ) {
    if( v1.length != v2.length ) throw new Error('Vectors are not the same size.');
    return v1.map( function( v, k ) {
      return v * v2[k];
    } ).reduce( function( va, vi ) {
      va += vi;
      return va;
    } );
  }
}

module.exports = Matrix;
