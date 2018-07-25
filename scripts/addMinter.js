var coinsmartt = artifacts.require("CoinSmartt");

//SET THE WALLET TO EXEUTE FROM
const wallet = "0x3f70369b366f38c6ea38076e6b040a88c6448548";

module.exports = async function(callback) {
	var instance = await coinsmartt.deployed();


	// var mnemonic = "";
	// var provider = await new HDWalletProvider(mnemonic, "http://localhost:8545", 0);
	try {
		var res = await instance.addMinter(process.argv[4], {from: wallet});
		console.log(res['tx'].valueOf());
		
		//or get a full receipt of transaction with
		//console.log(res.valueOf());
		
	}catch(e) {
		console.log(e)
	}
}