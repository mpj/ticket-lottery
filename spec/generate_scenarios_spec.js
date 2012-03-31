var vows                 = require('vows'),
    generateScenarios    = require('../lib/generate_scenarios'),
    assertContainsArray  = require('./helpers/assert_contains_array')

vows.describe('generateScenarios').addBatch({


    'generateScenarios mini case': {
        topic: function() {
            return generateScenarios(2);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            
            assert.equal(scenarios.length, 4);
            assertContainsArray(scenarios, [1,1]);
            assertContainsArray(scenarios, [1,0]);
            assertContainsArray(scenarios, [0,1]);
            assertContainsArray(scenarios, [0,0]);
        } 

    },  

    'generateScenarios bigger case': {
        topic: function() {
            return generateScenarios(4);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            
            assert.equal(scenarios.length, 16);
            assertContainsArray(scenarios, [1,1,1,1]);
            assertContainsArray(scenarios, [1,1,1,0]);
            assertContainsArray(scenarios, [1,1,0,0]);
            assertContainsArray(scenarios, [1,0,0,0]);
            assertContainsArray(scenarios, [1,0,1,0]);
            assertContainsArray(scenarios, [0,0,1,0]);
            assertContainsArray(scenarios, [0,0,0,0]);
            assertContainsArray(scenarios, [0,1,0,0]);
        } 

    },  

    'generateScenarios enourmous case': {
        topic: function() {
            this.startTime = new Date().getTime();
            return generateScenarios(17);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            var endTime = new Date().getTime();
            var duration = endTime-this.startTime;
            assert.isTrue(duration < 1000);
            
        } 

    },   




}).export(module); 

