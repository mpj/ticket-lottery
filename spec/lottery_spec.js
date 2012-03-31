var vows                = require('vows'),
    assert              = require('assert'),
    arrayContainsArray  = require('./helpers/array_contains_array'),
    lotterySimulator    = require('./helpers/lottery_simulator'),
    lottery             = require('../lib/lottery');

vows.describe('canWeWin').addBatch({

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

    '80 entrants, 5 friends, 4 winners, 2 tickets each': 
        createGetTickersContext({
            entrants: 80,
            winners: 4,
            tickets: 2,
            friends: 5
        }),

    
    '100 entrants, 9 friends, 10 winners, 3 tickets each': 
        createGetTickersContext({
            entrants: 100,
            winners: 10,
            tickets: 3,
            friends: 9
        }),

}).export(module); 

function createGetTickersContext(opts) {
    return {
        topic: function() {
        	var cb = this.callback
            lottery.canWeGetTickets(opts, function(err, probability) {
            	lotterySimulator.isPlausible(probability, opts, cb);
            });
        },

        'returns plausible probability': function (isPlausibleResult) {
            assert.isTrue(isPlausibleResult);
        }
    }
}

