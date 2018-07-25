import ether from './helpers/ether'
import EVMExcept from './helpers/EVMexcept'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'


const coinsmartt = artifacts.require("CoinSmartt");

const BigNumber = web3.BigNumber;
const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract("CoinSmartt: Test Initial Allocations", function(accounts) {
	const million = ether(1000000);
	const superuser = accounts[0];
	const owner = accounts[1];
	const minter = accounts[2];
	const crowdsale = accounts[3];

	const investor1 = accounts[4];
	const investor2= accounts[5];

	beforeEach(async function() {
		this.token = await coinsmartt.new(minter, {from: superuser})
	});

	it("Mints 1 million tokens to investor1", async function(){
		await this.token.mint(investor1, million.mul(2), {from: minter});
		(await this.token.balanceOf(investor1)).should.be.bignumber.equal(million.mul(2));
	});
	it("Fails to mint more than the max supply", async function() {
		await this.token.mint(investor1, ether(7663809525.81), {from: minter}).should.be.rejectedWith(EVMExcept);
	});
	it("Sets the superuser and owner to account 0", async function() {
		(await this.token.owner.call()).should.be.bignumber.equal(superuser);
		(await this.token.isSuperuser(superuser)).should.be.equal(true);
	});
	it("transfers ownership to account 1 from superuser", async function(){
		await this.token.transferOwnership(owner, {from: superuser}).should.be.fulfilled;
		(await this.token.owner.call()).should.be.bignumber.equal(owner);
	});
	it("transfers ownership to account 6 from owner(Account 1)", async function() {
		await this.token.transferOwnership(owner, {from: superuser}).should.be.fulfilled;
		await this.token.transferOwnership(accounts[6], {from: owner}).should.be.fulfilled;
		(await this.token.owner.call()).should.be.bignumber.equal(accounts[6]);
	});
	it("transfers ownership to account 6 away from owner by superuser", async function() {
		await this.token.transferOwnership(owner, {from: superuser}).should.be.fulfilled;
		await this.token.transferOwnership(accounts[6], {from: superuser}).should.be.fulfilled;
		(await this.token.owner.call()).should.be.bignumber.equal(accounts[6]);
	});
	it("transfers superusership to account 6", async function() {
		await this.token.transferSuperuser(accounts[6], {from: superuser}).should.be.fulfilled;
		(await this.token.isSuperuser(accounts[6])).should.be.equal(true);
	});
	it("Fails to transferOwnership by old superuser", async function() {
		await this.token.transferSuperuser(owner, {from: superuser}).should.be.fulfilled;
		(await this.token.isSuperuser(owner)).should.be.equal(true);
		await this.token.transferSuperuser(accounts[6], {from: superuser}).should.be.rejectedWith(EVMExcept);
	});
	it("Fails to mint from superuser", async function() {
		await this.token.mint(investor1, million.mul(2), {from: superuser}).should.be.rejectedWith(EVMExcept);
	});
	it("fails to mint from owner", async function(){
		await this.token.mint(investor1, million.mul(2), {from: owner}).should.be.rejectedWith(EVMExcept);
	})
	it("Removes minter from 'minter' role", async function() {
		await this.token.removeMinter(minter, {from: superuser}).should.be.fulfilled;
		await this.token.mint(investor1, million.mul(1), {from: minter}).should.be.rejectedWith(EVMExcept);
	})
	it("Adds crowdsale to 'minter' role", async function() {
		await this.token.addMinter(crowdsale, {from: superuser}).should.be.fulfilled;
		await this.token.mint(investor1, million.mul(1), {from: crowdsale}).should.be.fulfilled;
	})
})