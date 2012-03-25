
exports.canWeGetTickets = function (opts, cb) {

	var entrants = opts.entrants;
	var winners  = opts.winners ? opts.winners : 1;
	var friends  = opts.friends ? opts.friends : 1;
	var tickets  = opts.tickets ? opts.tickets : 99;

	var loseProbability = 1;
	var entrantsLeft = entrants
	for (var i=0;i<winners;i++) {
		loseProbability *= (entrantsLeft-friends) / (entrantsLeft);
		entrantsLeft-- 
	}
	var winProbability = 1-loseProbability
	cb(null, winProbability.toFixed(10))

}

