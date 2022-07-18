const { expect } = require("chai");

describe("WeekOne", function () {
  describe("Deployment", function () {
    it("Should be able to set the tokenURISource", async function () {
      const WeekOne = await ethers.getContractFactory("WeekOne");
      const weekOne = await WeekOne.deploy();
      await weekOne.deployed();

      let dummyURI = "ipfs://0000000000000000000000000000000000000000000000000000000000000000";
      await weekOne.setTokenURISource(dummyURI);

      expect(await weekOne.tokenURISource()).to.equal(dummyURI);
    });
  });

  describe("Mint", function () {
    it("Should be able to mint", async function () {
      const [owner] = await ethers.getSigners();
      const WeekOne = await ethers.getContractFactory("WeekOne");
      const weekOne = await WeekOne.deploy();
      await weekOne.deployed();

      await weekOne.mint();

      expect(await weekOne.balanceOf(owner.address)).to.equal(1);
    });

    it("Should be able to set the mint limit", async function () {
      const [owner] = await ethers.getSigners();
      const WeekOne = await ethers.getContractFactory("WeekOne");
      const weekOne = await WeekOne.deploy();
      await weekOne.deployed();

      let limit = 3;
      await weekOne.setMaxTokensPerAccount(limit);

      expect(await weekOne.maxTokensPerAccount()).to.equal(limit);
    });

    it("Should not exceed the mint limitation", async function () {
      const [owner] = await ethers.getSigners();
      const WeekOne = await ethers.getContractFactory("WeekOne");
      const weekOne = await WeekOne.deploy();
      await weekOne.deployed();

      let maxTokensPerAccount = await weekOne.maxTokensPerAccount();

      for (let i = 0; i < maxTokensPerAccount.toNumber(); i++) {
        await weekOne.mint();
      }

      await expect(weekOne.mint()).to.reverted;
    });

    it("Should be able to mint and the tokenURI should be correct", async function () {
      const [owner] = await ethers.getSigners();
      const WeekOne = await ethers.getContractFactory("WeekOne");
      const weekOne = await WeekOne.deploy();
      await weekOne.deployed();

      let dummyURI = "ipfs://0000000000000000000000000000000000000000000000000000000000000000";
      await weekOne.setTokenURISource(dummyURI);

      await weekOne.mint();

      expect(await weekOne.tokenURI(1)).to.equal(dummyURI);
    });
  });
});
