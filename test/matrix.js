var
  assert = require('assert'),
  Matrix = require('./../lib/matrix');

module.exports = {
  before: function() {
    this.m = {
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
        [21, 22, 23, 24, 25]
      ])
    };
  },
  add: {
    constant: function() {
      var result = this.m.a.add(32);
      assert.deepEqual(result.a, [[33,34],[35,36]]);
    },
    matrix: {
      'with equal dimensions': function() {
        var result = this.m.a.add(this.m.b);
        assert.deepEqual(result.a, [[6,8],[10,12]])
      }
    }
  },
  multiply: {
    constant: function() {
      var result = this.m.a.multiply(10);
      assert.deepEqual(result.a, [[10,20],[30,40]]);
    },
    matrix: {
      'with equal dimensions': function() {
        var result = this.m.a.multiply(this.m.b);
        assert.deepEqual(result.a, [[19,22],[43,50]]);
      },
      'X, Y with different dimensions': {
        'when X.C equals Y.R': {
          before: function() {
            this.X = this.m.x;
            this.Y = this.m.y;
            this.M = this.X.multiply(this.Y);
          },
          'the result, M': {
            'should have M.R equal to X.R': function() {
              assert.equal(this.M.R, this.X.R);
            },
            'should have M.C equal to Y.C': function() {
              assert.equal(this.M.C, this.Y.C);
            }
          }
        },
        'when X.C does not equal Y.R': {
          before: function() {
            this.X = this.m.x;
            this.Y = this.m.z;
          },
          'it should throw an error': function() {
            var self = this;
            assert.throws(function() {
              self.X.multiply(self.Y);
            });
          }
        }
      }
    }
  },
  concat: {
    'when X.R equals Y.R': function() {
      this.X = this.m.a;
      this.Y = this.m.g;
      var result = this.X.concat(this.Y);
      assert.deepEqual(result.a, [[1,2,7,8,9],[3,4,10,11,12]]);
    }
  }
};
