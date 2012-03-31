var vows                = require('vows'),
    assertContainsArray = require('./helpers/assert_contains_array'),
    filterScenarios     = require('../lib/filter_scenarios')

vows.describe('filterScenarios').addBatch({

    'filterScenarios': {
        topic: function() {
            return filterScenarios([
                [1,0,1,0,1,1],
                [0,0,1,0,1,1],
                [0,0,0,0,1,1],
                [0,0,0,1,1,1],
                [1,0,0,0,0,1],
                [1,1,0,1,0,1]
            ], 3)
        },

        'Should return all scenarios with 3 or more wins': function(filtered) {
            assert.equal( filtered.length, 4 );
            assertContainsArray( filtered, [1,0,1,0,1,1] );
            assertContainsArray( filtered, [0,0,1,0,1,1] );
            assertContainsArray( filtered, [1,0,1,0,1,1] );
            assertContainsArray( filtered, [1,1,0,1,0,1] );
        }

    }

}).export(module); 


