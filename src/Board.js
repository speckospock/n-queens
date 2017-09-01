// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //reduce row to its sum
      return this.get(rowIndex).reduce((sum, item) => {
        return sum + item;
      }) > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      return _.range(this.get('n')).reduce((wasFound, index) => {
        return wasFound || this.hasRowConflictAt(index);
      }, false);
    },

    numPieces: function() {
      if (this.get('n') === 0) {
        return 0;
      } else if (this.get('n') === 1) {
        return this.get(0)[0];
      } else {
        return this.rows().reduce((memo, row) => {
          return memo + row.reduce((memo2, col) => {
            return memo2 + col;
          }, 0);
        }, 0);
      }
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //

    //returns an array of a column in the board
    getColumn: function(colIndex) {
      return this.rows().map(row => {
        return row[colIndex];
      });
    },
    //returns an array of all columns
    columns: function() {
      return _.range(this.get('n')).map(col => {
        return this.getColumn(col);
      });
    },
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return this.getColumn(colIndex).reduce((sum, item) => {
        return sum + item;
      }) > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      return _.range(this.get('n')).reduce((wasFound, index) => {
        return wasFound || this.hasColConflictAt(index);
      }, false);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //set our variables
      var majDiagIndex = majorDiagonalColumnIndexAtFirstRow;
      var total = 0;

      //start at row 0, column majDiagIndex
      //iterate through
      for (var i = 0; i < this.get('n'); i++) {
        //  check if the location is on the board
        if (this._isInBounds(i, majDiagIndex + i)) {
          //if so, add the value at the current position to the running total
          total += this.get(i)[majDiagIndex + i];
        }
      }
      //if the total > 1, we know there's a conflict: return true
      return total > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //take range of all major diag start indeces, check each diagonal
      //return true if there are conflicts along any diagonals, else return false
      return _.range(((this.get('n') - 1) * (-1)), (this.get('n') - 1)).reduce((memo, diag) => {
        return memo || this.hasMajorDiagonalConflictAt(diag);
      }, false);
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var minDiagIndex = minorDiagonalColumnIndexAtFirstRow;
      var total = 0;

      for (var i = 0; i < this.get('n'); i++) {
        //check if it exists
        if (this._isInBounds(i, minDiagIndex - i)) {
          total += this.get(i)[minDiagIndex - i];
        }
      }

      return total > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return _.range(0, (2 * (this.get('n') - 1))).reduce((memo, diag) => {
        return memo || this.hasMinorDiagonalConflictAt(diag);
      }, false);
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
