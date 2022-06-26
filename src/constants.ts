export const unichatAddress = "0xfb5676a7ffd2a9fc4e491365d801ac01bc0afebf"; // TODO: update this to other networks as needed

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
export const unichatAbi = [
  // human-readable ABI for Unichat contract
  "function addData(string memory _oldHash, string memory _newHash) payable public returns(bool)",

  "function withdrawFunds(address payable _address) external returns(bool)",

  "event NewEntry(string _hash)",

];

export const unichatAbiTWOO = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_oldHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_newHash",
        "type": "string"
      }
    ],
    "name": "addData",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundContract",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_hash",
        "type": "string"
      }
    ],
    "name": "NewEntry",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "withdrawFunds",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "submitters",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]