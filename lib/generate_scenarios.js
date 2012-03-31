
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

  if (node.scenario.length == drawings)
    bucket.push(node.scenario);

  var childWinning = { scenario: node.scenario.slice(0) },
      childLosing  = { scenario: node.scenario.slice(0) };

  childWinning.scenario.push(1);
  childLosing.scenario.push(0);
  childWinning.wins = node.wins + 1
  childLosing.wins = node.wins

  //node.children = [ childWinning, childLosing ];

  if (!_isDeadEnd(childWinning, minWins, maxWins, drawings))
    _traverseTree(childWinning, bucket, drawings, minWins, maxWins)
  //else
    //console.log("Dead end:", childWinning.scenario)

  if (!_isDeadEnd(childLosing, minWins, maxWins, drawings))
    _traverseTree(childLosing, bucket, drawings, minWins, maxWins)
  //else
    //console.log("Dead end:", childLosing.scenario)


}

function _isDeadEnd(node, minWins, maxWins, drawings) {
  var maxLosses = drawings - minWins;
  var nodeLosses = node.scenario.length - node.wins;
  var isDeadEnd = node.scenario.length > drawings || 
                  node.wins > maxWins || 
                  nodeLosses > maxLosses;
  return isDeadEnd;
}






