var generateScenarios 	= require('./generate_scenarios'),
	filterScenarios  	= require('./filter_scenarios'),
	scenarioProbability = require('./scenario_probability')

/**
 *  canHasTickets
 *  
 *  The main function. Calculates the probability of 
 *  winning tickets for all friends given @opts.
 * 
 *  @opts {object} An options object with the following properties:
 *
 *    .entrants (Required, number) Total people entering the lottery.  
 *    .winners  (Optional, number) Winners picked. Default: 1
 *    .friends  (Optional, number) Friends entering. Default: 1
 *    .tickets  (Optional, number) Tickets each winner is allowed to buy.
 */
module.exports = function (opts, cb) {

	var entrants = opts.entrants;
	var winners  = opts.winners ? opts.winners : 1;
	var friends  = opts.friends ? opts.friends : 1;
	var tickets  = opts.tickets ? opts.tickets : 99;

	var winsNeeded = Math.ceil( friends / tickets);
	var scenarios = filterScenarios(generateScenarios(winners), winsNeeded, friends)
	
	var winProbability = 0;
	for (var i=0;i<scenarios.length;i++) {
		winProbability += 
			scenarioProbability(scenarios[i], friends, entrants)
	}   

	cb(null, winProbability.toFixed(10))

}

