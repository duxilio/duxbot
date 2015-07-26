var utils = require('./utils'),
	queryHandlers = {
		Lights: require('./query-handlers/lights')
	};

var Duxbot = function(query, callback){
	this.callback = callback;
	this.analyseQuery(query);
};

Duxbot.prototype.analyseQuery = function(query){
	var self = this;
	utils.analyseQuery({
		query: query,
		triggerWords: [{
			words: ['lights', 'light'],
			handler: queryHandlers.Lights
		}],
		defaultAction: function(){
			utils.getWolframResult(query, self.callback);
		}
	});
};

module.exports = Duxbot;