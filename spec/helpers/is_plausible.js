/* 
 */


function isPlausible(result, opts, cb) {
    var simulatedProbability = simulateDrawing(opts, function(simulationResult) {
    	var errorMargin = 0.001
    	cb(
    	   (result < simulationResult + errorMargin) &&
           (result > simulationResult - errorMargin)
        )
    })
}

function simulateDrawing(opts, cb) {
    
    var entrants = opts.entrants;
    var winners  = opts.winners ? opts.winners : 1;
    var friends  = opts.friends ? opts.friends : 1;
    var tickets  = opts.tickets ? opts.tickets : 99;

    var drawings = 1000000;
    var wins = 0;
    for(var i=0;i<drawings;i++) {
        var winningFriends = 0
        for(var j=0;j<winners;j++) {
            var rand = randomInRange(1, entrants-j)
            var weWonADrawing = ((friends-winningFriends) >= rand)
            if(weWonADrawing)
                winningFriends++
        }
        if ((winningFriends * tickets) >= friends) {
            wins++;
        }
    }
    cb(wins/drawings);
}

function randomInRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = isPlausible