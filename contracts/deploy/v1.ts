import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const DePassword = await ethers.getContractFactory("DePassword");
  const dePassword = await DePassword.deploy();

  console.log(">> DePassword was deployed to:", dePassword.address);
};

func.tags = ['DePasswordV1'];

export default func;
