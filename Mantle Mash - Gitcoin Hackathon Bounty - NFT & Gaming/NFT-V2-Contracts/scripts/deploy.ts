import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contracts with the address:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const IterableMappingLibrary = await ethers.getContractFactory("IterableMapping");
  const iterableMappingLibrary = await IterableMappingLibrary.deploy();
  await iterableMappingLibrary.deployed();

  console.log("IterableMappingLibrary deployed to:", iterableMappingLibrary.address);

  const TokenZoNugem = await ethers.getContractFactory("ZoNugem", {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  const TokenDividend = await ethers.getContractFactory("ZoNugemDividendTracker", {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  const tokenZoNugem = await TokenZoNugem.deploy();
  await tokenZoNugem.deployed();

  const tokenDividend = await TokenDividend.deploy();
  await tokenDividend.deployed();

  console.log("$ZoNugem deployed to:", tokenZoNugem.address);
  console.log("$ZoNugemDividendTracker deployed to:", tokenDividend.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
