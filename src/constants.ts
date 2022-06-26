import { ethers } from "ethers";
export const unichatAddress = "0x47a1fc3ef4d00e9862724e4d2cbc96a35e26a803"; // TODO: update this to other networks as needed

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
export const unichatAbi = [
  // human-readable ABI for Unichat contract
  "function AddData(string memory _oldHash, string memory _newHash) payable public returns(bool)",
  
  "function WithdrawFunds(address payable _address) external returns(bool)",

  "event NewEntry(string _hash)",
  
];

export const provider = new ethers.providers.JsonRpcProvider(process.env.URL);

export const signer = provider.getSigner()

export const unichatContract = new ethers.Contract(unichatAddress, unichatAbi, provider);