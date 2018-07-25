var coinsmartt = artifacts.require("CoinSmartt");
//SET THE WALLET TO EXEUTE FROM -- CAN USE web3.eth.accounts[0]
const wallet = "0x3f70369b366f38c6ea38076e6b040a88c6448548";

module.exports = async function(callback) {
	var instance = await coinsmartt.deployed();

	// var mnemonic = "";
	// var provider = await new HDWalletProvider(mnemonic, "http://localhost:8545", 0);
	try {
		var res = await instance.approve(process.argv[4], web3.toWei(process.argv[5], "ether"), {from: wallet});
		console.log(res['tx'].valueOf());
		var allowance = await instance.allowance(web3.eth.accounts[0], process.argv[4]);
		console.log(web3.fromWei(allowance.toString(), "ether"));
		//or get a full receipt of transaction with
		//console.log(res.valueOf());
		
	}catch(e) {
		console.log(e)
	}
}