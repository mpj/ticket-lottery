var vows                = require('vows'),
    assert              = require('assert'),
    generateScenarios   = require('../lib/generate_scenarios'),
    arrayContainsArray  = require('./helpers/array_contains_array')

vows.describe('generateScenarios').addBatch({

    'generateScenarios basic case': {
        topic: function() {
            return generateScenarios(4);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            
            assert.equal(scenarios.length, 16);
            assert.isTrue(arrayContainsArray(scenarios, [1,1,1,1]));
            assert.isTrue(arrayContainsArray(scenarios, [1,1,1,0]));
            assert.isTrue(arrayContainsArray(scenarios, [1,1,0,0]));
            assert.isTrue(arrayContainsArray(scenarios, [1,0,0,0]));
            assert.isTrue(arrayContainsArray(scenarios, [1,0,1,0]));
            assert.isTrue(arrayContainsArray(scenarios, [0,0,1,0]));
            assert.isTrue(arrayContainsArray(scenarios, [0,0,0,0]));
            assert.isTrue(arrayContainsArray(scenarios, [0,1,0,0]));
        } 

    },    

}).export(module); 

