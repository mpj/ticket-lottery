assert = require('assert');

/**
  *  assertContainsArray
  *  
  *  Function to assert if an array of arrays contains a specific array. :)
  *  
  *  @arrContainer {array} The array to search.
  *  @arrFind	   {array} The array we're searching for.
  *
  */
module.exports = function(arrContainer, arrFind) {
  assert.isTrue(_arrayContainsArray(arrContainer, arrFind));
}

function _arrayContainsArray(arrContainer, arrFind) {
    for(var i=0;i<arrContainer.length;i++)
        if (_arrayMatchesArray(arrContainer[i], arrFind))
            return true;
    return false;
}

function _arrayMatchesArray(left, right) {
    for(var i=0;i<left.length;i++)
        if(left[i] != right[i])
            return false;
    return true;
}