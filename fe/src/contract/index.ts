import { ethers } from "ethers";
import setting from "../setting";
import abi from "./abi";
import { Credential, FileUpload } from "../types";

const randomBytes = (n: number) => {
  const a = new Uint8Array(n);
  const quota = 65536;
  for (let i = 0; i < n; i += quota) {
    window.crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, quota)));
  }

  return a;
};

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

export const generateKey = async () => {
  const contract = getContract();
  const key = randomBytes(32);
  const result = await contract.updateKey(key);
  await result.wait(1);
};

export const getKey = async () => {
  const contract = getContract();
  return contract.getKey();
};
