var vows    = require('vows'),
    assert  = require('assert'),
    lottery = require('../lottery');

vows.describe('canWeWin').addBatch({

    '100 entrants (just me, single winner, infinite tickets)': {

        topic: function() {
            lottery.canWeGetTickets({
                entrants: 100
            }, this.callback);
        },

        'returned probability is plausible': function(probability) {
            assert.isTrue(isPlausible(probability, {
                entrants: 100
            }))
        }
    },

    '100 entrants, 2 friends (single winner, infinite tickets)': {

        topic: function() {
            lottery.canWeGetTickets({
                entrants: 100,
                friends: 2
            }, this.callback);
        },

        'returns correct probability': function (probability) {
            assert.isTrue(isPlausible(probability, {
                entrants: 100,
                friends: 2
            }))
        },
    },

    '100 entrants, 2 friends, 10 winners (infinite tickets)': {

        topic: function() {
            lottery.canWeGetTickets({
                entrants: 100,
                friends: 2,
                winners: 10
            }, this.callback);
        },

        'returns correct probability': function (probability) {
            assert.isTrue(isPlausible(probability, {
                entrants: 100,
                friends: 2,
                winners: 10
            }))
        },
    }

}).export(module); 


function isPlausible(result, opts) {
    var simulatedProbability = simulateDrawing(opts)
    var absoluteError = 0.0005
    return (result < simulatedProbability + absoluteError) &&
           (result > simulatedProbability - absoluteError);
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
    return wins/drawings;
}

function randomInRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}