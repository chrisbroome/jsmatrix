function Coprimes( a0, a1 ) {
  function initialize() {
    var a = Math.floor(a0),
        b = Math.floor(a1);
    return a > b ? { a: a, b: b } : { a: b, b: a };
  }
  function first( a, b ) {
    return { m: a % b, a: a, b: b,
      iterate: function() {
        return Coprimes( this.b, this.m );
      }
    };
  }
  var i = initialize();
  return first( i.a, i.b );
}

function gcd( a, b ) {
  if( b === 0 || b === a ) return a;
  if( a === 0 ) return b;

  var x = Coprimes( a, b );
  while( x.m !== 0 ) {
    x = x.iterate();
  }
  return gcd( x.b, x.m );
}

function Rational( numerator, denominator ) {
  var n = Math.floor( numerator ),
      d = Math.floor( denominator );
  if( d === 0 ) throw new Error('Denominator cannot be zero.');

  function add( r ) {
    if( typeof r === 'number' ) {
      return add_number( r );
    } else if ( typeof r === 'object' && r.constructor === ctor ) {
      return add_rational( r );
    } else {
      return r;
    }
  }

  function add_number( x ) {
    return Rational( n + x*d, d );
  }

  function add_rational( r ) {
    return ( d === r.d ) ?
      Rational( n + r.n, d ) :
      Rational( n*r.d + r.n*d, d*r.d );
  }

  function reduce() {
    var f = gcd( n, d );
    n /= f;
    d /= f;
  }

  function toString() {
    return d === 1 ? n : n + ' / ' + d;
  }

  reduce();

  function ctor( o ) {
    function F(){}
    F.prototype = o;
    return new F();
  }

  return ctor({
    n: n,
    d: d,
    toString: toString
  });
}

module.exports = {
  Rational: Rational,
  gcd: gcd
};
