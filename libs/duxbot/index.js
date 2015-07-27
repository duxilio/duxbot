var utils = require('./utils'),
	queryHandlers = {
		Lights: require('./query-handlers/lights')
	};

var Duxbot = function(callback){
	utils.init(callback);
};

Duxbot.prototype.analyseQuery = function(query){
	if(query === ''){
		utils.callback('hi');
		return;
	}

	var self = this;
	utils.analyseQuery({
		query: query,
		triggerWords: [{
			words: ['lights', 'light'],
			handler: function(foundWord, query){
				new queryHandlers.Lights(foundWord, query);
			}
		}],
		defaultAction: function(){
			utils.getWolframResult(query);
		}
	});
};

module.exports = Duxbot;