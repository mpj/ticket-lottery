var vows    = require('vows'),
    assert  = require('assert'),
    lottery = require('../lottery');

vows.describe('canWeWin').addBatch({

    /*
    'Simulate': {
        topic: function() {
            return simulateDrawing({
                entrants: 10,
                winners: 6,
                tickets: 1,
                friends: 6
            })
        },

        'Debugging': function(res) {
            console.log("res", res)
        }
    },*/

    '100 entrants (just me, single winner, infinite tickets)':
        createGetTickersContext({
                entrants: 100
        }),

    '100 entrants, 2 friends (single winner, infinite tickets)': 
        createGetTickersContext({
            entrants: 100,
            friends: 2
        }),

    '100 entrants, 2 friends, 10 winners (infinite tickets)': 
        createGetTickersContext({
            entrants: 100,
            friends: 2,
            winners: 10
        }),

    '10 entrants, 1 friends, 10 winners (infinite tickets)': 
    createGetTickersContext({
        entrants: 10,
        winners: 10,
        friends: 1
    }),

    '100 entrants, 2 friends, 10 winners, 1 tickets each': 
        createGetTickersContext({
            entrants: 100,
            friends: 2,
            winners: 10,
            tickets: 1
        }),

    '10 entrants, 6 friends, 6 winners, 1 tickets each': 
        createGetTickersContext({
            entrants: 10,
            winners: 6,
            tickets: 1,
            friends: 6
        }),

    '10 entrants, 6 friends, 6 winners, 1 tickets each': 
        createGetTickersContext({
            entrants: 80,
            winners: 8,
            tickets: 2,
            friends: 4
        }),

    /*
        Utmaningen här är att vi har fyra vänner på oss
        att vinna TVÅ gånger. 

        Försök till lösning: Räkna ut risken för att 
        FÖRLORA två gånger med fyra vänner och invertera det.



    */









}).export(module); 

function createGetTickersContext(opts) {
    return {
        topic: function() {
            lottery.canWeGetTickets(opts, this.callback);
        },

        'returns plausible probability': function (probability) {

            assert.isTrue(isPlausible(probability, opts))
        }
    }
}

function isPlausible(result, opts) {
    var simulatedProbability = simulateDrawing(opts)
    
    // UNCOMMENT TO DEBUG
    var errMargin = Math.round((result / simulatedProbability) * 100)
    console.log("Checking result" , result, 
        "against simulation", simulatedProbability,
        "("+errMargin+"% error)"
        )
    
    var absoluteError = 0.001
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