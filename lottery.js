
exports.canWeGetTickets = function (opts, cb) {

	totalProbLose = 1
	while(opts.friends--) {
		probabilityLose = ((opts.entrants - opts.winners) / opts.entrants)
		totalProbLose *= probabilityLose
		opts.entrants--
	}
	
	cb(null, (1-totalProbLose).toFixed(10))

}
