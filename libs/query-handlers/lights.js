var utils = require('../utils');

var Lights = function(query, callback){
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
				console.log('turn the lights off');
			}
		}, {
			words: ['on'],
			handler: function(){
				console.log('turn the lights on');
			}
		}, {
			words: ['dim'],
			handler: function(){
				console.log('dim the lights');
			}
		}],
		defaultAction: function(){
			console.log('no words matched in lights');
		}
	});
};

module.exports = Lights;