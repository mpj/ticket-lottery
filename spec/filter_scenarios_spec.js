var vows                = require('vows'),
    assertContainsArray = require('./helpers/assert_contains_array'),
    filterScenarios     = require('../lib/filter_scenarios')

vows.describe('filterScenarios').addBatch({

    'filterScenarios (mininum 3 wins)': {
        topic: function() {
            return filterScenarios([
                [ 0,1,0,1,0 ], // 2 wins
                [ 0,1,1,1,0 ], // 3 wins
                [ 1,1,0,1,1 ], // 4 wins
                [ 0,0,0,0,1 ], // 1 win
            ], 3, 99)
        },

        'Should return all scenarios with 3 or more wins': function(filtered) {
            assert.equal( filtered.length, 2 );
            assertContainsArray( filtered, [ 0,1,1,1,0 ] );
            assertContainsArray( filtered, [ 1,1,0,1,1 ] );
        }

    },

    'filterScenarios (min 2 wins, max 3 wins)': {
        topic: function() {
            return filterScenarios([
                [ 1,0,0,0 ],
                [ 1,1,0,0 ],
                [ 1,1,1,0 ],
                [ 1,1,1,1 ],

            ], 2, 3)
        },

        'Should filter out scenarios outside range': function(filtered) {
            assert.equal( filtered.length, 2 );
            assertContainsArray( filtered, [ 1,1,0,0 ] );
            assertContainsArray( filtered, [ 1,1,1,0 ] );
        }

    }

}).export(module); 


