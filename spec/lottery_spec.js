var vows    = require('vows'),
    assert  = require('assert'),
    lottery = require('../lottery');

vows.describe('canWeWin').addBatch({
    
    'Case 100/10/2/1': {

        topic: function() {
            lottery.canWeGetTickets({
                entrants: 100,
                winners: 10,
                tickets: 2,
                friends: 1
            }, this.callback);
        },

        'returns correct probability': function (probability) {
            assert.equal(probability, 0.1)
        },
    },

    'Case 100/10/2/2': {

        topic: function() {
            lottery.canWeGetTickets({
                entrants: 100,
                winners: 10,
                tickets: 2,
                friends: 2
            }, this.callback);
        },

        'returns correct probability': function (probability) {
            assert.equal(probability, 0.1909090909)
        },
    },

}).export(module); // Export the Suite