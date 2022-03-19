import { ethers } from "ethers";
import setting from "../setting";
import abi from "./abi/DePassword.json";
import { Credential, FileUpload } from "../types";

export const getSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum!);
  const signer = provider.getSigner(0);
  return signer;
};

export const getContract = () => {
  const signer = getSigner();
  const contractAddress = setting.CONTRACT_ADDRESS;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};

export const getListCredentials = async () => {
  const contract = getContract();
  return contract.listCredentials();
};

export const addCredential = async (credetial: Credential) => {
  const contract = getContract();
  const result = await contract.addCredential(credetial);
  await result.wait(1);
  return result;
};

export const updateCredential = async (
  index: number,
  credetial: Credential
) => {
  const contract = getContract();
  const result = await contract.updateCredential(index, credetial);
  await result.wait(1);
  return result;
};

export const deleteCredential = async (index: number) => {
  const contract = getContract();
  const result = await contract.deleteCredential(index);
  await result.wait(1);
  return result;
};

export const getListFiles = async () => {
  const contract = getContract();
  return contract.listFiles();
};

export const addFile = async (file: FileUpload) => {
  const contract = getContract();
  const result = await contract.addFile(file);
  await result.wait(1);
  return result;
};

export const deleteFile = async (index: number) => {
  const contract = getContract();
  const result = await contract.deleteFile(index);
  await result.wait(1);
  return result;
};
