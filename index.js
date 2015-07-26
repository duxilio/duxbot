var Duxbot = require('./libs/duxbot'),
	say = require('say'),
	input = process.argv[2];

if(input.indexOf('duxbot') !== -1){

	//if duxbot is mentioned, continue
	new Duxbot(process.argv[2], function(speechResult, logResult){
		say.speak(null, speechResult);
		console.log(logResult || speechResult);
	});

}