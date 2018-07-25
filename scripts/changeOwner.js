var coinsmartt = artifacts.require("CoinSmartt");
//SET THE WALLET TO EXEUTE FROM -- CAN USE web3.eth.accounts[0]
const wallet = "0x3f70369b366f38c6ea38076e6b040a88c6448548";
module.exports = async function(callback) {
	var instance = await coinsmartt.deployed();

	// var mnemonic = "";
	// var provider = await new HDWalletProvider(mnemonic, "http://localhost:8545", 0);
	try {
		//**** pass {from: provider.address} to from parameter in non-development
		var res = await instance.transferOwnership(process.argv[4], {from: wallet});
		console.log(res['tx'].valueOf());
		//check that the 'paused' contract variable returns true 
		console.log('owner: ' + await instance.owner());
		
		//or get a full receipt of transaction with
		//console.log(res.valueOf());
		
	}catch(e) {
		console.log(e)
	}
}