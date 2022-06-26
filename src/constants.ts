export const unichatAddress = "0xe22C890D43204cebE8371C8EB9Da3F9548B58B18"; // TODO: update this to other networks as needed

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
export const unichatAbi = [
  // human-readable ABI for Unichat contract
  "function addData(string memory _oldHash, string memory _newHash) payable public returns(bool)",
  
  "function withdrawFunds(address payable _address) external returns(bool)",

  "event NewEntry(string _hash)",
  
];

