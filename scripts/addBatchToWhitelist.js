var ico = artifacts.require("CoinSmarttICO");
//SET THE WALLET TO EXEUTE FROM
const wallet = "0x3f70369b366f38c6ea38076e6b040a88c6448548";

module.exports = async function(callback) {
	var instance = await ico.deployed();


	try {
		const addresses = ["0x52ec63d5ebdea0314a5fa7f76eef12e20c573eea", "0xcc377ccb23a1ee58004c843c7035a160b27fda45", "0x3ac4535e391bed9377d9b3df078efb391d2fb593", "0xbdf4630271a53c1a980c7af031c1e907a64e5ff6"];
		var res = await instance.addAddressesToWhitelist(addresses, {from: wallet});

		//To effect gasPrice add the following transaction param `gasPrice: web3.toWei(21, "Gwei")`
		//var res = await instance.mint(process.argv[4], web3.toWei(process.argv[5], "ether"), {from: web3.eth.accounts[0], gasPrice: web3.toWei(21, "Gwei")});
		console.log(res['tx'].valueOf());
		//or get a full receipt of transaction with
		//console.log(res.valueOf());
		
	}catch(e) {
		console.log(e)
	}
}