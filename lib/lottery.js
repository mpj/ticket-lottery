var generateScenarios 	= require('./generate_scenarios'),
	filterScenarios  	= require('./filter_scenarios'),
	scenarioProbability = require('./scenario_probability')

exports.canWeGetTickets = function (opts, cb) {

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

