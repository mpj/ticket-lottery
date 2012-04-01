
/**
  *  generateScenarios
  *  
  *  Generates an array of all possible lottery scenarios given @drawings,
  *  and assuming infinite friends. For example, generateScenarios(3) would
  *  return:
  *
  *  [ 
  *		[1,1,1],
  *		[0,0,0],
  *		[1,0,1],
  *		[1,1,0],
  *		[1,1,0] ...
  *
  *	  ... and so on. In the most extreme scenario, we win all drawings ([1,1,1]) 
  *   and on the other extreme, we lose all drawings ([0,0,0]).
  *
  *  @drawings   {number}  Number of winners drawn in the lottery.
  * 
  *  @minWins  {number} Don't return scenarios with less wins than this number. 
  *  Optional. Default: 0  
  *
  *  @maxWins  {number} Don't return scenarios with more wins than this number. 
  *  Optional. Default: =@drawings
  *
  *  @return 	 {array}   An array of arrays, each representing a scenario of wins 
  *  and losses. Ex: [[0,0,1,1,0], [[1,0,1,1,0], ...] = LLWWL, WLWWL, ...
  */

module.exports = function(drawings, minWins, maxWins) {

	if(!minWins) minWins = 0;
  if(!maxWins) maxWins = drawings;

  var scenarios = [];
  var treeRoot = { scenario: [], wins: 0 };

  _traverseTree(treeRoot, scenarios, drawings, minWins, maxWins);

	return scenarios;
}


function _traverseTree(node, fullScenarios, drawings, minWins, maxWins ) {

  // Create all possible scenarios by growing a binary tree,
  // and collect the scenarios of the leaf nodes into fullScenarios.

  //            ROOT
  //          /      \
  //         W        L
  //        / \      / \
  //      WW   WL  LW   LL
  //
  //     .... and so on ....


  // Have we generated a complete scenario yet?
  var isFull = node.scenario.length == drawings;
  if (isFull) {
    
    // Once we get a full scenario, collect it.
    fullScenarios.push(node.scenario);
    
    // A full scenario also means that there is no need 
    // to create more branches, so we stop recursing.
    return;
  }

  // Is this node a dead end?
  // Because generating all possible combinations would be 
  // O(insane), we need to predict if a branch will be a dead end,
  // and if so, stop growing that branch.
  var maxLosses = drawings - minWins,
      nodeLosses = node.scenario.length - node.wins,
      isDeadEnd = node.wins > maxWins || nodeLosses > maxLosses;
  if (isDeadEnd) return;

  
  // Grow the branch into two more branches,
  // one where we win...
  var nodeWinner = _cloneNode(node);
  nodeWinner.scenario.push(1);
  nodeWinner.wins++

  // ... and one where we lose ..
  var nodeLoser  = _cloneNode(node);
  nodeLoser.scenario.push(0);
  
  // ... and walk down both paths ...
  _traverseTree(nodeWinner, fullScenarios, drawings, minWins, maxWins)
  _traverseTree(nodeLoser, fullScenarios, drawings, minWins, maxWins)
}

function _createNode(scenario, wins) {
  return {
    wins: node.wins,
    scenario: node.scenario.slice(0)
  }
}






