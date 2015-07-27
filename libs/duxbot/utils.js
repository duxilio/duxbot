var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);

var utils = {

	init: function(callback){
		this._callback = callback;
	},

	callback: function(options){
		if(typeof options === 'string'){
			var result = options;
			options = {
				prettyResult: options
			};
		}

		this._callback({
			statusCode: options.statusCode || 0,
			prettyResult: options.prettyResult,
			logResult: options.logResult || options.prettyResult
		});
	},

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

				if(this.checkStrForWord(currWord, query)){
					wordFoundHandler(currObj, currWord);
					return;
				}
			}
		}

		defaultAction();
	},

	checkStrForWord: function(word, str){
		return new RegExp(' '+word+' ').test(str) ||
			   new RegExp('^'+word+' ').test(str) ||
			   new RegExp(' '+word+'$').test(str);
	},

	getWolframResult: function(query){
		var self = this;
		wolfram.query(query, function(err, result){
		    if(err) throw err;

		    if(result[1] && result[1].subpods[0]){
		    	self.callback(result[1].subpods[0].value.replace(/\(.+\)/g, ''));
		    } else {
		    	self.callback({
		    		statusCode: 1,
		    		prettyResult: 'Sorry, I do not know what you mean.'
		    	});
		    }
		});
	}
};

module.exports = utils;