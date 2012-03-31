var vows                = require('vows'),
    assert              = require('assert'),
    isPlausible         = require('./helpers/is_plausible'),
    canWeGetTickets     = require('../lib/can_we_get_tickets');

vows.describe('canWeGetTickets').addBatch({

    '100 entrants (just me, single winner, infinite tickets)':
        plausibleGetTicketsContext({
                entrants: 100
        }),

    '100 entrants, 2 friends (single winner, infinite tickets)': 
        plausibleGetTicketsContext({
            entrants: 100,
            friends: 2
        }),

    '100 entrants, 2 friends, 10 winners (infinite tickets)': 
        plausibleGetTicketsContext({
            entrants: 100,
            friends: 2,
            winners: 10
        }),

    '10 entrants, 1 friends, 10 winners (infinite tickets)': 
        plausibleGetTicketsContext({
            entrants: 10,
            winners: 10,
            friends: 1
        }),

    '100 entrants, 2 friends, 10 winners, 1 tickets each': 
        plausibleGetTicketsContext({
            entrants: 100,
            friends: 2,
            winners: 10,
            tickets: 1
        }),

    '10 entrants, 6 friends, 6 winners, 1 tickets each': 
        plausibleGetTicketsContext({
            entrants: 10,
            winners: 6,
            tickets: 1,
            friends: 6
        }),

    '80 entrants, 4 friends, 4 winners, 2 tickets each': 
        plausibleGetTicketsContext({
            entrants: 80,
            winners: 4,
            tickets: 2,
            friends: 4
        }),

    '80 entrants, 5 friends, 4 winners, 2 tickets each': 
        plausibleGetTicketsContext({
            entrants: 80,
            winners: 4,
            tickets: 2,
            friends: 5
        }),

    
    '100 entrants, 9 friends, 10 winners, 3 tickets each': 
        plausibleGetTicketsContext({
            entrants: 100,
            winners: 10,
            tickets: 3,
            friends: 9
        }),

}).export(module); 

// Simple Vows macro to make the specs a bit 
// nicer. (See http://vowsjs.org/#-macros)
function plausibleGetTicketsContext(opts) {
    return {
        topic: function() {
        	var context = this;
            canWeGetTickets(opts, function(err, probability) {
            	isPlausible(probability, opts, context.callback);
            });
        },

        'Should returns plausible probability': function (isPlausibleResult) {
            assert.isTrue(isPlausibleResult);
        }
    }
}

