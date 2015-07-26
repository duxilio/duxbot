var wolfram = require('wolfram').createClient(process.env.WOLFRAM_API_KEY);

var utils = {

	analyseQuery: function(options){
		var query = options.query,
			triggerWords = options.triggerWords,
			defaultAction = options.defaultAction;

		var wordFoundHandler = function(currObj){
			//check if there is a function to handle
			//the triggerWord
			if(currObj.handler){
				new currObj.handler(query, this.callback);
			} else {
				defaultAction();
			}
		};
		
		//loop triggerWords
		for(var i = triggerWords.length-1; i >= 0; i--){
			var currObj = triggerWords[i];

			//if triggerWord is found in query
			for(var j = currObj.words.length-1; j >= 0; j--){
				var currWord = currObj.words[j];
				if(query.indexOf(currWord) !== -1){
					wordFoundHandler(currObj);
					return;
				}
			}
		}

		defaultAction();
	},

	getWolframResult: function(query, callback){
		wolfram.query(query, function(err, result) {
		    if(err) throw err;
		    callback('====> '+result[1].subpods[0].value);
		});
	}
	
};

module.exports = utils;