
exports.canWeGetTickets = function (opts, cb) {

	var entrants = opts.entrants;
	var winners  = opts.winners ? opts.winners : 1;
	var friends  = opts.friends ? opts.friends : 1;
	var tickets  = opts.tickets ? opts.tickets : 99;

	if (tickets >= friends) {
		// One win needed
		winProbability = chanceOfWinning(entrants,winners,friends)
		cb(null, winProbability.toFixed(10))
	} else {
		// Less friends than tickets. 
		// This means that we need to win more than one time.
		var winsNeeded = Math.ceil( friends / tickets);
		var cases = module.exports.filterCases(
			module.exports.generateCases(friends), winsNeeded)
		winProbability = 0;
		for (var i=0;i<cases.length;i++) {
			winProbability += 
				module.exports.
					calculateCaseProbability(entrants, winners, cases[i])
		}
		if (winsNeeded != friends) 
			winProbability *= 2
	       

		cb(null, winProbability.toFixed(10))
	}

}

module.exports.calculateCaseProbability = function(entrants, winners, caseArr) {
	var prob = 1
	for (var i=0;i<caseArr.length;i++) {
		var isWin = !!caseArr[i];
		if(isWin) // Skip over case unless we are winner
			prob *= (winners-i) / (entrants-i)
	}
	return prob;
}


module.exports.generateCases = function(friends) {

	var cases = [[0], [1]];

	for(var j=0;j<friends;j++) {
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

module.exports.filterCases = function(cases, winsNeeded) {
	var filteredCases = []
	for(var i=0;i<cases.length;i++) 
		if(winCount(cases[i]) >= winsNeeded)
			filteredCases.push(cases[i])
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

// Calculate the chance of a single person winning a draw, 
// given a certain amount of participants and drawings.
function chanceOfWinning(participants, winners, friends) {
	return 1-chanceOfLosing(participants, winners, friends)
}

function chanceOfLosing(participants, winners, friends) {
	
	if(!friends) friends = 1

	var loseProbability = 1;
	var participantsLeft = participants
	for (var i=0;i<winners;i++) {
		p = (participantsLeft-friends) / (participantsLeft);
		
		loseProbability *= p
		participantsLeft--
	}
	return loseProbability
}



