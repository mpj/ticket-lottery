
exports.canWeGetTickets = function (opts, cb) {

	loseProbability = 1;
	while(opts.friends--) {
		loseProbability *= (opts.entrants - opts.winners) / opts.entrants;
		opts.entrants--;
	}
	winProbability = 1 - loseProbability;
	cb(null, winProbability.toFixed(10))

}
