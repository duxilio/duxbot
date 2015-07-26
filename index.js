var Duxbot = require('./libs/duxbot');

new Duxbot(process.argv[2], function(result){
	console.log(result);
});