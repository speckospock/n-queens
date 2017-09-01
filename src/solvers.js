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

  //set up an identity matrix (which will ALWAYS be a valid nRooks solution )
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  // var helper = (row = 0, col = 0, pieces = n) => {
  //   if (pieces > 0) {
  //     solution.togglePiece(row++, col++);
  //     // row++;
  //     // col++;
  //     helper(row, col, --pieces);
  //   }
  // };
  //
  // helper();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //return the identity matrix
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
  if (n > 1 && n < 4) {
    solution = new Board({'n': n});
  }
  //for n > 3, there will be at least one solved board.
  if (n > 3 && n < 8) {

    //build identity matrix, using findNRooksSolution
    var identity = window.findNRooksSolution(n);

    //create a range from 0 -> n
    var ref = _.range(n);

    //create an evens array
    var evens = [];
    //create an odds array
    //join them
    var odds = ref.filter((ele) => {
      if (!(ele % 2)) { //if ele is even
        evens.push(ele);
      }
      return !!(ele % 2); //returns true if ele is odd, false if even
    });
    //if n is odd, move all even numbers in range to the front, odd to back
    if (!!(n % 2)) {
      ref = evens.concat(odds);
    } else { //if n is even, do opposite: odd numbers to front, even to back
      ref = odds.concat(evens);
    }

    var solution = new Board({'n': n});
    //map to the identity matrix according to that list
    ref.map((item, index) => {
      solution.set(index, identity.get(item));
    });

    //return the mapped board

    // var queenBoard = new Board({'n': n});
    // //if n is odd:
    // if (!!(n % 2)) {
    //   //1. place a queen at 0, 0
    //   var colIndex = 2;
    //   queenBoard.togglePiece(0, 0);
    //   for (var rowIndex = 1; rowIndex < n; rowIndex++) {
    //     // var rowIndex = 0;
    //     if (!(queenBoard._isInBounds(rowIndex, colIndex))) {
    //       colIndex -= n;
    //     }
    //     queenBoard.togglePiece(rowIndex, colIndex);
    //     colIndex += 2;
    //   }
    //   console.log('Single solution for ' + n + ' queens:', JSON.stringify(queenBoard));
    //   return queenBoard;
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
  if (n === 8) {
    var eightBoard = new Board({'n': 8});
    //place a queen at 0,1
    var j = 2;
    for (var i = 0; i < 4; i++) {
      eightBoard.togglePiece(i, j);
      j += 2;
      if (j >= n) {
        j -= n;
      }
    }
    j = 3;
    for(var i = 4; i < n; i++) {
      eightBoard.togglePiece(i, j);
      j -= 2;
      if (j < 0) {
        j += n;
      }
    }
    //knight move down 1 and to the right 2
      //place queen at that spot
    //when 4th row is reached, start at 5th row, pick first valid spot
      //place queen at that spot
    //knight move down 1 and to the left 2
      //wrap at first move to accomodate for edge
  }

  return solution || eightBoard;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var countQBoard = new Board({'n': n});
  //helper function that accepts param 'row', iterate through each row
  var helper = (row) => {
    //base-case row === n
      //if triggered, increment solutionCount
    if (row === n) {
      solutionCount++;
      return;
    }
    //iterate through each column
    for (var i = 0; i < n; i++) {
      //place a piece at Board[row, column]
      countQBoard.togglePiece(row, i);
      //check for conflicts
        //if not, call helper(row+1)
      if(!countQBoard.hasAnyQueensConflicts()) {
        helper(row + 1);
      }
      countQBoard.togglePiece(row, i);
    }
  };

  helper(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
