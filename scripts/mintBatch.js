var coinsmartt = artifacts.require("CoinSmartt");
var fs = require("fs");

//SET THE WALLET TO EXEUTE FROM -- CAN USE web3.eth.accounts[0]
const wallet = "0x3f70369b366f38c6ea38076e6b040a88c6448548";

module.exports = async function(callback) {
	var instance = await coinsmartt.deployed();


	var contents = fs.readFileSync(process.argv[4]);
	var batch = JSON.parse(contents);
	for (var i=0; i < batch.length; i++)
	{
		var res = await instance.mint(batch[i]['address'], web3.toWei(batch[i]['tokens'], "ether"), {from: wallet});
		var balance = await instance.balanceOf(batch[i]['address']);

		//See that tokens were issued at a glance
		console.log(batch[i]['address'] + ": " + web3.fromWei(balance.valueOf(), "ether"));	
		//Alternatively you may want to write the transaction hash to your log files in production
		//console.log(res['tx'].valueOf());
	}

}