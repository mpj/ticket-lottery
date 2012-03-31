// @scenario: An array of boolean values that reflects whether
// the friends group won or not. Example: [ 1, 0, 0, 0, 1, 0 ] represents
// a scenario where 6 winners are drawn, where the friends won in the first 
// drawing, then lost 3 drawings,
// and then won again, and finally lost the final drawing. 
// @friends: The number of friends in the drawing. 
// @participants: The number of participants in the lottery, including friends.

module.exports = function(scenario, friends, participants ) {
	
	var prob = 1;
	var friendsLeftInCompetition = friends;
	var totalPartipantsLeft = participants;

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
			prob *= 1-probabilityOfFriendsWinning;
		}
		totalPartipantsLeft--;
	}
	return prob;
}


