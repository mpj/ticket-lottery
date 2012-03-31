var vows                = require('vows'),
    assert              = require('assert'),
    generateScenarios   = require('../lib/generate_scenarios'),
    filterScenarios     = require('../lib/filter_scenarios'),
    scenarioProbability = require('../lib/scenario_probability');

vows.describe('calculateScenarioProbability').addBatch({

    'calculateScenarioProbability 1': {
    	
    	topic: function() {
    		var p1 = scenarioProbability([ 1, 0 ], 2, 100)
    		var p2 = scenarioProbability([ 1, 1 ], 2, 100)
    		var p3 = scenarioProbability([ 0, 1 ], 2, 100)
    		var p4 = scenarioProbability([ 0, 0 ], 2, 100)
    		return p1+p2+p3+p4
    	},

    	'should be 1': function(prob) {
    		assert.equal(prob, 1)
    	}
    },

    'calculateScenarioProbability 2': {
    	
    	topic: function() {
    		var scenarios10Winners = generateScenarios(10);
    		var totalProb = 0;
    		for (var i=0;i<scenarios10Winners.length;i++) {
    			var s = scenarios10Winners[i];
    			totalProb += scenarioProbability(s, 2, 100);
    		}

    		return totalProb;
    	},

    	'should be 1': function(prob) {
    		assert.equal(prob, 1);
    	}
    },

    'calculateScenarioProbability 3': {
    	
    	topic: function() {
    		var scenarios10Winners = generateScenarios(10);
			var scenariosWhereWeGetEnoughTickets = filterScenarios(scenarios10Winners, 1, 2);
    		var totalProb = 0;
    		for (var i=0;i<scenariosWhereWeGetEnoughTickets.length;i++) {
    			var s = scenariosWhereWeGetEnoughTickets[i];
    			totalProb += scenarioProbability(s, 2, 100);
    		}

    		return totalProb;
    	},

    	'should be 0.19090909090909097': function(prob) {
    		assert.equal(prob.toFixed(10), 0.1909090909);
    	}
    }

}).export(module); 


