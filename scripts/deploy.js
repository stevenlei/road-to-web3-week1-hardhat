const hre = require("hardhat");

// ipfs://bafkreie4cvubiluowgj3otuxx2cnpn3yklhldu6eoqljjox5rucscha2le

async function main() {
  const WeekOne = await ethers.getContractFactory("WeekOne");
  const weekOne = await WeekOne.deploy();
  await weekOne.deployed();

  console.log("WeekOne deployed to:", weekOne.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
