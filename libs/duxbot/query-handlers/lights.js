var utils = require('../utils');

var Lights = function(foundWord, query){
	this.analyseQuery(query);
};

Lights.prototype.analyseQuery = function(query){
	var self = this;

	utils.analyseQuery({
		query: query,
		triggerWords: [{
			words: ['off'],
			handler: function(){
				utils.callback('turning off the lights');
			}
		}, {
			words: ['on'],
			handler: function(){
				utils.callback('turning on the lights');
			}
		}, {
			words: ['dim'],
			handler: function(){
				utils.callback('dimming the lights');
			}
		}],
		defaultAction: function(){
			utils.callback({
				statusCode: 1,
				prettyResult: 'no action found for your command',
				logResult: 'no action found for '+query
			});
		}
	});
};

module.exports = Lights;