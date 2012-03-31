var generateScenarios = require('./generate_scenarios')
var filterScenarios   = require('./filter_scenarios')

exports.canWeGetTickets = function (opts, cb) {

	var entrants = opts.entrants;
	var winners  = opts.winners ? opts.winners : 1;
	var friends  = opts.friends ? opts.friends : 1;
	var tickets  = opts.tickets ? opts.tickets : 99;

	// Less friends than tickets. 
	// This means that we need to win more than one time.
	var winsNeeded = Math.ceil( friends / tickets);
	var cases = filterScenarios(generateScenarios(winners), winsNeeded, friends)
	
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




