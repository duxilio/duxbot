var chalk = require('chalk');

var utils = {

	getCurrTimeStr: function(){
		var date = new Date();
		return date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+
		' '+date.getHours()+':'+date.getMinutes();
	},

	log: function(str){
		console.log( chalk.blue('['+this.getCurrTimeStr()+'] ') + str );
	}

};

module.exports = utils;