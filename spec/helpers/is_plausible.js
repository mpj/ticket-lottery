

/** 
 *  isPlausible  
 *
 *  A simple test that simulates an actual lottery an insane amount of 
 *  times and compares that to a given probability to see if it's plausible.
 *   
 *  @probability {number} The probability that we want to check if it's plausible,
 *  in the form of a number between 0 and 1.
 *  
 *  @opts {object} Lottery options - accepts exactly the same options as 
 *  canWeGetTickets accepts. 
 *  
 *  @return {boolean} True if @probability is a plausible winning probability
 *  given @opts, otherwise false;
 *  
 */
function isPlausible(probability, opts, callback) {
    _simulateLottery(opts, function(simulationResult) {
    	var errorMargin = 0.001
    	callback(
    	   (probability < simulationResult + errorMargin) &&
           (probability > simulationResult - errorMargin)
        )
    })
}

function _simulateLottery(opts, cb) {
    
    var entrants = opts.entrants;
    var winners  = opts.winners ? opts.winners : 1;
    var friends  = opts.friends ? opts.friends : 1;
    var tickets  = opts.tickets ? opts.tickets : 99;

    var simulations = 1000000;
    var wins = 0;
    for(var i=0;i<simulations;i++) {
        var winningFriends = 0
        for(var j=0;j<winners;j++) {
            var rand = _randomInRange(1, entrants-j)
            var weWonADrawing = ((friends-winningFriends) >= rand)
            if(weWonADrawing)
                winningFriends++
        }
        if ((winningFriends * tickets) >= friends) {
            wins++;
        }
    }
    cb(wins/simulations);
}

function _randomInRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = isPlausible