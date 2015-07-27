var utils = require('../utils');

var Lights = function(foundWord, query, callback){
	this.callback = callback;
	this.analyseQuery(query);
};

Lights.prototype.analyseQuery = function(query){
	var self = this;

	utils.analyseQuery({
		query: query,
		triggerWords: [{
			words: ['off'],
			handler: function(){
				self.callback('turning off the lights');
			}
		}, {
			words: ['on'],
			handler: function(){
				self.callback('turning on the lights');
			}
		}, {
			words: ['dim'],
			handler: function(){
				self.callback('dimming the lights');
			}
		}],
		defaultAction: function(){
			self.callback('no action found for your command', 'no action found for '+query);
		}
	});
};

module.exports = Lights;