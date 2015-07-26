var utils = require('./utils'),
	queryHandlers = {
		Lights: require('./query-handlers/lights')
	};

var Duxbot = function(query, callback){
	//strip duxbot from the query
	query = query.replace('duxbot', '').trim();

	if(query === ''){
		callback('How can I help?');
		return;
	}

	this.callback = callback;
	this.analyseQuery(query);
};

Duxbot.prototype.analyseQuery = function(query){
	var self = this;
	utils.analyseQuery({
		query: query,
		triggerWords: [{
			words: ['lights', 'light'],
			handler: function(foundWord, query){
				new queryHandlers.Lights(foundWord, query, self.callback);
			}
		}],
		defaultAction: function(){
			utils.getWolframResult(query, self.callback);
		}
	});
};

module.exports = Duxbot;