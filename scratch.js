window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // var helper = (i = n) => {
  //   return i === 0 ? 1 : i * helper(i - 1);
  // };

  //get range from 0 to n
  var range = _.range(0, n);
  var permutations = {};
  //iterate over range
  for (var i = 0; i < n; i++) {
    permutations[i] = range.slice(0, i).concat(range.slice(i + 1, n));
  }

  var output = {};

  var helper = function(obj) {
    // debugger;
    for (var key in obj) {
      if (obj[key].length === 0) {
        output[key] = [];
        return obj;
      }
      for (var j = 0; j < obj[key].length; j++) {
        debugger;
        var newKey = key + obj[key][j];
        output[newKey] = obj[key].slice(0, j).concat(obj[key].slice(j + 1, n));
      }
    }
    return helper(output);
  };

  helper(permutations);
    //at each i, pop from the range at index i
    //store key 'i' w/ the value of the remainder of the array
  //repeat iteration until values are empty arrays and key is length n

  //end with object of keys that correspond to permutations

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return Object.keys(output).length;
  // return helper(n);
};
