/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});

  var helper = (row = 0, col = 0, pieces = n) => {
    if (pieces > 0) {
      solution.togglePiece(row++, col++);
      // row++;
      // col++;
      helper(row, col, --pieces);
    }
  };

  helper();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  var helper = (i = n) => {
    return i === 0 ? 1 : i * helper(i - 1);
  };

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return helper(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution; //fixme
  //if n <= 3: we know how many configs there should be
    //n = 0: zero queens at [null, null]
    //n = 1: one queen at [0, 0]
    //n = 2: no solution
    //n = 3: no solution
  if (n <= 1) {
    if (n === 0) {
      solution = new Board({'n': 0});
    } else {
      solution = new Board({'n': 1});
      solution.togglePiece(0, 0);
    }
  }
  //for n > 3, there will be at least one solved board.
  if (n > 3) {
    var queenBoard = new Board({'n': n});
    //if n is odd:
    if (!!(n % 2)) {
      //1. place a queen at 0, 0
      var colIndex = 2;
      queenBoard.togglePiece(0, 0);
      for (var rowIndex = 1; rowIndex < n; rowIndex++) {
        // var rowIndex = 0;
        if (!(queenBoard._isInBounds(rowIndex, colIndex))) {
          colIndex -= n;
        }
        queenBoard.togglePiece(rowIndex, colIndex);
        colIndex += 2;
      }
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(queenBoard));
      return queenBoard;
    }
  }
      //2. add 2 to colIndex and 1 to rowIndex
        // colIndex += 2;
        // rowindex ++;
        //if it's a valid space, place queen, goto 2

        //if not: goto 1
      //3. return the solved Board
    //if n is even:

      //1. pick a start point, place a queen,
      //2. add 2 to colIndex and 1 to rowIndex
        //if it's a valid space and within bounds, place queen
        //if not a valid space, goto 1
        //if is valid space, out of bounds, start at beginning of current row and place a queen at the next valid spot
      //3. return the solved board


  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
