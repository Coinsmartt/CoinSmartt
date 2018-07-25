import ether from './helpers/ether'
import EVMExcept from './helpers/EVMexcept'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'

const coinsmartt = artifacts.require("CoinSmartt");
const ico = artifacts.require("ICO");

const BigNumber = web3.BigNumber;
const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract("ICO: Test Crowdsale", function(accounts) {
	const million = ether(1000000);
	const superuser = accounts[0];
	const owner = accounts[1];
	const minter = accounts[2];
	const crowdsale = accounts[3];

	const investor1 = accounts[4];
	const investor2 = accounts[5];
	const escrow = accounts[6];

	beforeEach(async function() {
		this.token = await coinsmartt.new(minter, {from: superuser})
		this.ICO = await ico.new(1000, escrow, this.token.address, {from: owner});
		this.token.addMinter(this.ICO.address, {from: superuser});
	});
	it("Should whitelist an address", async function() {
		await this.ICO.addAddressToWhitelist(investor1, {from: owner});
		(await this.ICO.whitelist(investor1)).should.be.equal(true);
	});
	it("Checks that the rate is 0.001 per token", async function() {
		await this.ICO.addAddressToWhitelist(investor1, {from: owner});
		await this.ICO.buyTokens(investor1, {from: investor1, value: ether(0.001)}).should.be.fulfilled;
		(await this.token.balanceOf(investor1)).should.be.bignumber.equal(ether(1));
	});
})