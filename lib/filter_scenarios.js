module.exports = function(scenarios, winsMinimum, winsMaximum) {
	if (!winsMaximum) winsMaximum = 99
	var filteredScenarios = []
	for(var i=0;i<scenarios.length;i++) {
		var wins = winCount(scenarios[i]);
		if (wins >= winsMinimum && wins <= winsMaximum)
			filteredScenarios.push(scenarios[i])
	}	
	return filteredScenarios;
}

function winCount(scenario) {
	var count = 0
	for(var i=0;i<scenario.length;i++)
		if (!!scenario[i])
			count++
	return count
}
