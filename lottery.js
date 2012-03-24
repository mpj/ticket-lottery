
exports.canWeGetTickets = function (opts, cb) {

	probability = (opts.friends / opts.entrants) * opts.winners

	cb(null, probability)

}