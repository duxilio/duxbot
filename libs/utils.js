var wolfram = require('wolfram').createClient(process.env.WOLFRAM_API_KEY);

var utils = {
	analyseQuery: function(options){
		var query = options.query,
			triggerWords = options.triggerWords,
			defaultAction = options.defaultAction;

		var wordFoundHandler = function(currObj, foundWord){
			//check if there is a function to handle
			//the triggerWord
			if(currObj.handler){
				currObj.handler(foundWord, query);
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
					wordFoundHandler(currObj, currWord);
					return;
				}
			}
		}

		defaultAction();
	},

	getWolframResult: function(query, callback){
		wolfram.query(query, function(err, result){
		    if(err) throw err;
		    console.log(result);
		    callback(result[1].subpods[0].value.replace(/\(.+\)/g, ''));
		});
	}
};

module.exports = utils;