var say = require('say'),
	Duxbot = require('./libs/duxbot'),
	logger = require('./libs/logger');

var input = process.argv[2],
	triggerWord = 'hey duxbot';

if(new RegExp('^'+triggerWord.replace(/\s/g, '\\s')+'([^a-zA-Z0-9])?', 'i').test(input)){
	//if <triggerword> is mentioned, continue

	//strip duxbot from the query
	var query = process.argv[2].replace(triggerWord, '').trim();

	var duxClient = new Duxbot(function(result){
		say.speak(null, result.prettyResult);

		switch(result.statusCode){
			case 0:
				//success
				logger.log(result.logResult);
				break;
			case 1:
				//warn
				logger.warn(result.logResult);
				break;
			case 2:
				//error
				logger.error(result.logResult);
				break;
		}
	});

	duxClient.analyseQuery(query);
}