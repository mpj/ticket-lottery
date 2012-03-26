
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
		var winsNeeded = friends / tickets;
		if (winsNeeded == friends) {
			// This works in the case where all friends need to win.
			// We simply calculate the chance if winning for
			// each friend and multiply them.
			var winProbability = 1
			for (var i=0;i<winsNeeded;i++) {
				winProbability *= chanceOfWinning(entrants-i, winners-i);
			}
		} else {
			// However, what if winsNeeded are less than friends?
			// I.e. we do need to win more than one time,
			// but have more friends we need wins, giving us
			// more shots at winning.
			// ShotsToWin 
			/*

			{
	            entrants: 80,
	            winners: 8,
	            tickets: 2,
	            friends: 4
	        }

	        This means that we need 2 wins BUT we have 4 friends to do it.
			How to deal with THAT?
			THe problem with the above solution is that it assumes that
			all friends must win.

			Can we calculate the odds of 4 people generating a win, and doubling 
			that?
			
			*/
	       
		}

		cb(null, winProbability.toFixed(10))
	}

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



