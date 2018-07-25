var coinsmartt = artifacts.require("CoinSmartt");

//SET THE WALLET TO EXEUTE FROM
const wallet = "0x3f70369b366f38c6ea38076e6b040a88c6448548";

module.exports = async function(callback) {
	var instance = await coinsmartt.deployed();


	try {
		var res = await instance.mint(process.argv[4], web3.toWei(process.argv[5], "ether"), {from: wallet});

		//To effect gasPrice add the following transaction param `gasPrice: web3.toWei(21, "Gwei")`
		//var res = await instance.mint(process.argv[4], web3.toWei(process.argv[5], "ether"), {from: web3.eth.accounts[0], gasPrice: web3.toWei(21, "Gwei")});
		console.log(res['tx'].valueOf());
		//or get a full receipt of transaction with
		//console.log(res.valueOf());
		
	}catch(e) {
		console.log(e)
	}
}