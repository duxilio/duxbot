var wolfram = require('wolfram').createClient(process.env.WOLFRAM_API_KEY);

console.log(process.argv[2]);

wolfram.query(process.argv[2], function(err, result) {
    if(err) throw err;
    console.log(result);
    console.log('====> '+result[1].subpods[0].value);
});