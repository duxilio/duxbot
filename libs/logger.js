var chalk = require('chalk');

var logger = {

	_getCurrTimeStr: function(){
		var date = new Date();
		return chalk.blue('['+date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+
		' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'] ');
	},

	_log: function(color, str){
		console.log(this._getCurrTimeStr()+chalk[color](str));
	},
	
	log: function(str){
		this._log('white', str);
	},

	warn: function(str){
		this._log('yellow', str);
	},

	error: function(str){
		this._log('red', str);
	}

};

module.exports = logger;