module.exports = function(cases, winsMinimum, winsMaximum) {
	if (!winsMaximum) winsMaximum = 99
	var filteredCases = []
	for(var i=0;i<cases.length;i++) {
		var wins = winCount(cases[i]);
		if (wins >= winsMinimum && wins <= winsMaximum)
			filteredCases.push(cases[i])
	}	
	return filteredCases;
}

function winCount(caseArr) {
	var count = 0
	for(var i=0;i<caseArr.length;i++)
		if (caseArr[i])
			count++
	return count
}
