
exports.canWeGetTickets = function (opts, cb) {

	var entrants = opts.entrants;
	var winners  = opts.winners ? opts.winners : 1;
	var friends  = opts.friends ? opts.friends : 1;
	var tickets  = opts.tickets ? opts.tickets : 99;

	// Less friends than tickets. 
	// This means that we need to win more than one time.
	var winsNeeded = Math.ceil( friends / tickets);
	var cases = module.exports.filterCases(
		module.exports.generateCases(winners), winsNeeded, friends)
	
	winProbability = 0;
	for (var i=0;i<cases.length;i++) {
		winProbability += 
			module.exports.
				calculateScenarioProbability(cases[i], friends, entrants)
	}
       

	cb(null, winProbability.toFixed(10))

}

// @scenario: An array of boolean values that reflects whether
// the friends group won or not. Example: [ 1, 0, 0, 0, 1, 0 ] represents
// a scenario where 6 winners are drawn, where the friends won in the first 
// drawing, then lost 3 drawings,
// and then won again, and finally lost the final drawing. 
// @friends: The number of friends in the drawing. 
// @participants: The number of participants in the lottery, including friends.

module.exports.calculateScenarioProbability = 
	function(scenario, friends, participants ) {
	
	var prob = 1 
	var friendsLeftInCompetition = friends
	var totalPartipantsLeft = participants

	for (var i=0;i<scenario.length;i++) {
		var probabilityOfFriendsWinning = 
			friendsLeftInCompetition / totalPartipantsLeft;

		var friendsWinThisDrawing = !!scenario[i];
		if(friendsWinThisDrawing) {
			prob *= probabilityOfFriendsWinning;
			friendsLeftInCompetition--;
		} else {
			// In in drawings where the friends are 
			// supposed to lose, we invert the probability
			// of the friends winning.
			prob *= 1-probabilityOfFriendsWinning
		}
		totalPartipantsLeft--

	}

	// I THINK it's vital to include the final value even in the friends lose,
	// because we are calculting this apart from whether or not it's positive
	// whether or not the friends lose or not.
	return prob;
}


module.exports.generateCases = function(winners) {

	var cases = [[0], [1]];

	for(var j=0;j<winners;j++) {
		var l=cases.length;
		for(var i=0;i<l;i++) {
			var cw = cases[i].slice(0);
			var cl = cases[i].slice(0);
			cw.push(1)
			cl.push(0)
			cases.push(cw)
			cases.push(cl)
		}
		var cleanedCases = []
		for(var i=0;i<cases.length;i++) 
			if (cases[i].length == j+1)
				cleanedCases.push(cases[i])
		cases = cleanedCases
	
	}
	return cases;
}

module.exports.filterCases = function(cases, winsMinimum, winsMaximum) {
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
	for(var i=0;i<caseArr.length;i++) {
		if (caseArr[i])
			count++
	}
	return count
}



