require('babel-register');
require('babel-polyfill');
require('dotenv').config();

const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

// var mainNetPrivateKey = new Buffer(process.env["MAINNET_PRIVATE_KEY"], "hex")
// var mainNetWallet = Wallet.fromPrivateKey(mainNetPrivateKey);
// var mainNetProvider = new WalletProvider(mainNetWallet, "https://mainnet.infura.io/");

var rinkebyPrivateKey = new Buffer(process.env["RINKEBY_PRIVATE_KEY"], "hex")
var rinkebyWallet = Wallet.fromPrivateKey(rinkebyPrivateKey);
var rinkebyProvider = new WalletProvider(rinkebyWallet, "https://rinkeby.infura.io/");
/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    	},
	testnet: {
		provider: rinkebyProvider,
		host:"https://rinkeby.infura.io/",
		port: 80,
		network_id: "*",
		}
	}
};
