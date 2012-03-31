
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
  *  @return 	 {array}   An array of arrays, each representing a scenario of wins 
  *  and losses. Ex: [0,0,1,1,0] = LLWWL.
  */

module.exports = function(drawings, minWins, maxWins) {

	if(!minWins) minWins = 0;
  if(!maxWins) maxWins = drawings;

  var scenarios = [];
  var treeRoot = {
    scenario: [],
    wins: 0
  }

  _traverseTree(treeRoot, scenarios, drawings, minWins, maxWins)

	return scenarios;
}

function _traverseTree(node, bucket, drawings, minWins, maxWins ) {

  var maxLosses = drawings - minWins;
  var nodeLosses = node.scenario.length - node.wins;
  var isDeadEnd = node.wins > maxWins || 
                  nodeLosses > maxLosses;

  if (isDeadEnd) return;

  var isLeafNode = node.scenario.length == drawings;
  if (isLeafNode) {
    bucket.push(node.scenario);
    return;
  }

  var nodeWinner = _cloneNode(node);
  nodeWinner.scenario.push(1);
  nodeWinner.wins++
  
  var nodeLoser  = _cloneNode(node);
  nodeLoser.scenario.push(0);
  
  _traverseTree(nodeWinner, bucket, drawings, minWins, maxWins)
  _traverseTree(nodeLoser, bucket, drawings, minWins, maxWins)
}

function _cloneNode(node) {
  return {
    wins: node.wins,
    scenario: node.scenario.slice(0)
  }
}






