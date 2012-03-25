
exports.canWeGetTickets = function (opts, cb) {

	var entrants = opts.entrants;
	var winners  = opts.winners ? opts.winners : 1;
	var friends  = opts.friends ? opts.friends : 1;
	var tickets  = opts.tickets ? opts.tickets : 99;

	if (tickets >= friends) {
		var loseProbability = 1;
		var entrantsLeft = entrants
		for (var i=0;i<winners;i++) {
			loseProbability *= (entrantsLeft-friends) / (entrantsLeft);
			entrantsLeft-- 
		}
		var winProbability = 1-loseProbability
		cb(null, winProbability.toFixed(10))
	} else {
		// Less friends than tickets
		
		var winProbability = 1
		for (var i=0;i<friends;i++) {
			winProbability *= chanceOfWinning(entrants-i, winners-i);
		}
		cb(null, winProbability.toFixed(10))
	}

}

//var winsNeeded = friends / tickets
//var extraChances = friends - winsNeeded


// Calculate the chance of a single person winning, given
// a certain amount of participants and drawings.
function chanceOfWinning(participants, drawings) {
	return 1-chanceOfLosing(participants, drawings)
}

function chanceOfLosing(participants, drawings) {
	var loseProbability = 1;
	var participantsLeft = participants
	for (var i=0;i<drawings;i++) {
		loseProbability *= (participantsLeft-1) / (participantsLeft);
		participantsLeft-- 
	}
	return loseProbability
}



