
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

  module.exports = function(drawings) {

	var cases = [[0], [1]];

	for(var j=0;j<drawings;j++) {
		var l=cases.length;
		for(var i=0;i<l;i++) {
			var cw = cases[i].slice(0);
			var cl = cases[i].slice(0);
			cw.push(1);
			cl.push(0);
			cases.push(cw);
			cases.push(cl);
		}
		var cleanedCases = [];
		for(var i=0;i<cases.length;i++)
			if (cases[i].length == j+1)
				cleanedCases.push(cases[i]);
		cases = cleanedCases;
	}
	return cases;
}