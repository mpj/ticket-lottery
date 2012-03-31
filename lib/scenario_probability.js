

/**
  *  scenarioProbability
  *  
  *  Calculates the probability of a certain @scenario happening during
  *  a lottery, given @friends and @participants.
  * 
  *  @scenario: An array of boolean values that reflects whether
  *  the friends group won or not. Example: [ 1, 0, 0, 0, 1, 0 ] represents 
  *  a scenario where 6 winners are drawn, where the friends won in the first 
  *  drawing, then lost 3 drawings,
  *  and then won again, and finally lost the final drawing. 

  *  @friends 		{number} Friends in the drawing.
  *  @participants 	{number} Participants in the lottery, including friends.
  *
  *  @return 	 {number}  Probability of this exact scenario happening,
  *  represented as a number between 0 and 1. 
  */
module.exports = function(scenario, friends, participants ) {
	
	var prob = 1;
	var friendsLeft = friends;
	var totalPartipantsLeft = participants;

	for (var i=0;i<scenario.length;i++) {
		
		var probabilityOfFriendsWinning = 
			friendsLeft / totalPartipantsLeft;

		var friendsWinThisDrawing = !!scenario[i];
		
		if(friendsWinThisDrawing) {
			prob *= probabilityOfFriendsWinning;
			friendsLeft--;
		} else {
			var probabilityOfEnemiesWinning = 1-probabilityOfFriendsWinning;
			prob *= probabilityOfEnemiesWinning;
		}
		totalPartipantsLeft--;

	}
	return prob;
}


