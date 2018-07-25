var coinsmartt = artifacts.require("./CoinSmartt.sol");
var crowdsale = artifacts.require("./CoinSmarttICO.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(coinsmartt, accounts[0]).then(function() {
  	return deployer.deploy(crowdsale, 1000, accounts[0], coinsmartt.address);
  });


};