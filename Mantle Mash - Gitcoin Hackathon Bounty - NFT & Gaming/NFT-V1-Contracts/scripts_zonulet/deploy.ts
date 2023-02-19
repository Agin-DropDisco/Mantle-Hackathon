import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contracts with the address:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const IterableMappingLibrary = await ethers.getContractFactory("IterableMapping");
  const iterableMappingLibrary = await IterableMappingLibrary.deploy();
  await iterableMappingLibrary.deployed();

  console.log("IterableMappingLibrary deployed to:", iterableMappingLibrary.address);

  
  const TokenDividen = await ethers.getContractFactory("ZoNuletDividendTracker", {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  const TokenZonulet = await ethers.getContractFactory("ZoNulet",  {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  
  const tokenDividen = await TokenDividen.deploy();
  await tokenDividen.deployed();

  const tokenZonulet = await TokenZonulet.deploy();
  await tokenZonulet.deployed();

  console.log("$ZoNuletDividendTracker deployed to:", tokenDividen.address);
  console.log("$ZoNulet deployed to:", tokenZonulet.address);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
