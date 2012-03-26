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

    '80 entrants, 4 friends, 4 winners, 2 tickets each': 
        createGetTickersContext({
            entrants: 80,
            winners: 4,
            tickets: 2,
            friends: 4
        }),

    /*
        Calculate the probability for all possible cases and combine.

        The number of chars = friends (i.e. the chances we have in the draw)
        We need to generate the probability of all cases where our group 
        wins enough times to be able to buy tickets for everyone.


        {
            entrants: 80,
            winners: 4,
            tickets: 2,
            friends: 4
        }

        Simulated prob: 0.01099723

        WIN cases:
            4 wins (1 case):
            WWWW = (4/80)*(3/79)*(2/78)*(1/77)  = .000000632 
            
            3 wins:
            WWWL = (4/80)*(3/79)*(2/78)         = .000048685
            WWLW = (4/80)*(3/79)       *(1/77)  = .000024659
            WLWW = (4/80)       *(2/78)*(1/77)  = .00001665
            LWWW =        (3/79)*(2/78)*(1/77)  = .000012646

            2 wins
            WWLL = (4/80)*(3/79)                = .001898734
            WLWL = (4/80)       *(2/78)         = .001282051
            WLLW = (4/80)*              (1/77)  = .000649351
            LWWL =        (3/79)*(2/78)         = .00097371
            LWLW =        (3/79)       *(1/77)  = .000493178
            LLWW =               (2/78)*(1/77)  = .000333

            .000000632+
            .000048685+
            .000024659+
            .00001665+
            .000012646+
            .001898734+
            .001282051+
            .000649351+
            .00097371+
            .000493178+
            .000333=.005733296

            // hmmm

            .005733296 * 2 is correct. I wonder if this is 
            the number of wins needed or just the double?

        {
            entrants: 80,
            winners: 4,
            tickets: 2,
            friends: 5
        }

        Simulated prob: 0.0004931

        // 3 wins needed

        4 wins (1 case):
        WWWW = (4/80)*(3/79)*(2/78)*(1/77)  = .000000632 
        
        3 wins:
        WWWL = (4/80)*(3/79)*(2/78)         = .000048685
        WWLW = (4/80)*(3/79)       *(1/77)  = .000024659
        WLWW = (4/80)       *(2/78)*(1/77)  = .00001665
        LWWW =        (3/79)*(2/78)*(1/77)  = .000012646


        .000000632+
        .000048685+
        .000024659+
        .00001665+
        .000012646=.000103272        
        
    */

    'calculateCaseProbability 1': {
        topic: function() {
           return lottery.calculateCaseProbability(80, 4, [1,1,1,1])
        },
        'should calculate correct probability': function(prob) {
            assert.equal(prob, 6.322791132917715e-7)
        }
    },

    'calculateCaseProbability 2': {
        topic: function() {
           return lottery.calculateCaseProbability(80, 4, [1,1,0,1])
        },
        'should calculate correct probability': function(prob) {
            assert.equal(prob, 0.000024658885418379094)
        }
    },

    'generateCases': {
        topic: function() {
            return lottery.generateCases(4)
        },

        'correct': function(err, cases) {
            if(err) throw err;
            
            assert.equal(cases.length, 16)
            assert.isTrue(arrayContainsArray(cases, [1,1,1,1]))
            assert.isTrue(arrayContainsArray(cases, [1,1,1,0]))
            assert.isTrue(arrayContainsArray(cases, [1,1,0,0]))
            assert.isTrue(arrayContainsArray(cases, [1,0,0,0]))
            assert.isTrue(arrayContainsArray(cases, [1,0,1,0]))
            assert.isTrue(arrayContainsArray(cases, [0,0,1,0]))
            assert.isTrue(arrayContainsArray(cases, [0,0,0,0]))
            assert.isTrue(arrayContainsArray(cases, [0,1,0,0]))

        } 

    },

    'filterCases': {
        topic: function() {
            return lottery.filterCases([
                [1,0,1,0,1,1],
                [0,0,1,0,1,1],
                [0,0,0,0,1,1],
                [0,0,0,1,1,1],
                [1,0,0,0,0,1],
                [1,1,0,1,0,1]
            ], 3)
        },

        'should return all cases with 3 or more wins': function(filtered) {
            assert.equal(filtered.length, 4)
            assert.isTrue(arrayContainsArray(filtered, [1,0,1,0,1,1]))
            assert.isTrue(arrayContainsArray(filtered, [0,0,1,0,1,1]))
            assert.isTrue(arrayContainsArray(filtered, [1,0,1,0,1,1]))
            assert.isTrue(arrayContainsArray(filtered, [1,1,0,1,0,1]))
        }

    }


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

function arrayContainsArray(arrContainer, arrFind) {
    for(var i=0;i<arrContainer.length;i++)
        if (arrayMatchesArray(arrContainer[i], arrFind))
            return true;
    return false;
}

function arrayMatchesArray(left, right) {
    for(var i=0;i<left.length;i++)
        if(left[i] != right[i])
            return false;
    return true;
}

