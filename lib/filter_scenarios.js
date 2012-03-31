
/**
  *  filterScenarios
  *  
  *  Returns a new, filtered array of @scenarios (see generateScenarios) 
  *  with only scenarios that have more or equal to @winsMinimum
  *  and less or equal to @winsMaximum.
  *  
  *  @scenarios   {array}  The array of scenarios that we want to filter.
  *  @winsMinimum {number} The minimum amount of wins acceptable.
  *  @winsMaximum {number} The maximum amount of wins acceptable.
  */
module.exports = function(scenarios, winsMinimum, winsMaximum) {
	if (!winsMaximum) winsMaximum = 99;
	var filteredScenarios = [];
	for(var i=0;i<scenarios.length;i++) {
		var wins = _winCount(scenarios[i]);
		if (wins >= winsMinimum && wins <= winsMaximum)
			filteredScenarios.push(scenarios[i]);
	}	
	return filteredScenarios;
}

function _winCount(scenario) {
	var count = 0;
	for(var i=0;i<scenario.length;i++)
		if (!!scenario[i])
			count++;
	return count;
}
