var Duxbot = require('./libs/duxbot'),
	say = require('say'),
	input = process.argv[2];

if(input.indexOf('duxbot') !== -1){
	//if duxbot is mentioned, continue

	//strip duxbot from the query
	var query = process.argv[2].replace('duxbot', '').trim();

	new Duxbot(query, function(prettyResult, logResult){
		say.speak(null, prettyResult);
		console.log(logResult || prettyResult);
	});

}