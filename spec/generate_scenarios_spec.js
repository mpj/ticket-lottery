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

    'generateScenarios mini case (filtered on minimum 1 win)': {
        topic: function() {
            return generateScenarios(2,1);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(scenarios.stack) throw scenarios;
            
            assert.equal(scenarios.length, 3);
            assertContainsArray(scenarios, [1,1]);
            assertContainsArray(scenarios, [1,0]);
            assertContainsArray(scenarios, [0,1]);
        } 

    },  

    'generateScenarios (minimum 1 win, max 99)': {
        topic: function() {
            return generateScenarios(3,1,99);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            
            assert.equal(scenarios.length, 7);
            assertContainsArray(scenarios, [ 1, 1, 1 ]);
            assertContainsArray(scenarios, [ 1, 1, 0 ]);
            assertContainsArray(scenarios, [ 1, 0, 1 ]);
            assertContainsArray(scenarios, [ 1, 0, 0 ]);
            assertContainsArray(scenarios, [ 0, 1, 1 ]);
            assertContainsArray(scenarios, [ 0, 1, 0 ]);
            assertContainsArray(scenarios, [ 0, 0, 1 ]);
        } 

    },

    'generateScenarios (minimum 2 win, max 99)': {
        topic: function() {
            return generateScenarios(3, 2, 99);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            
            assert.equal(scenarios.length, 4);
            assertContainsArray(scenarios, [ 1, 1, 1 ]);
            assertContainsArray(scenarios, [ 1, 1, 0 ]);
            assertContainsArray(scenarios, [ 1, 0, 1 ]);
            assertContainsArray(scenarios, [ 0, 1, 1 ]);
        } 

    },

    'generateScenarios (minimum 1 win, max 2)': {
        topic: function() {
            return generateScenarios(3,1,2);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            
            assert.equal(scenarios.length, 6);
            assertContainsArray(scenarios, [ 1, 1, 0 ]);
            assertContainsArray(scenarios, [ 1, 0, 1 ]);
            assertContainsArray(scenarios, [ 1, 0, 0 ]);
            assertContainsArray(scenarios, [ 0, 1, 1 ]);
            assertContainsArray(scenarios, [ 0, 1, 0 ]);
            assertContainsArray(scenarios, [ 0, 0, 1 ]);
        } 

    },


    'generateScenarios bit bigger case': {
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

    'generateScenarios gigantic performance case': {
        topic: function() {
            this.startTime = new Date().getTime();
            return generateScenarios(95,1,2);
        },

        'Should generate possible scenarios': function(err, scenarios) {
            if(err) throw err;
            var endTime = new Date().getTime();
            var duration = endTime-this.startTime;
            assert.isTrue(duration < 10000);
            
        } 

    },   




}).export(module); 

