import { ethers } from "ethers";
import { Message, DataEntry , DataStructure} from '../types'
import { cache, storage } from '../store'
import * as dotenv from 'dotenv';

dotenv.config()

// const message: Message = {
//     signature: '0x23234432', //this signature signs all the other fields in the message
//     from: 'Bob.eth',
//     to: 'Sam.eth',
//     time: 45334255234345,
//     text: 'i love you so much',
//     cid: '13420897142'
// }

// const singleDataEntry: DataEntry = {
//     hash: '0x1241234413', //this hash represents the ENTIRE `dataStructure` hashed down, including the messages of this singleDataEntry only
//     messages: [message,message]
// }

// const localMessages = [
//     message,
//     message,
//     message,
//     message,
//     message
// ]
//
// const mempool = [
//     singleDataEntry,
//     singleDataEntry,
//     singleDataEntry,
//     singleDataEntry,
// ]
//
//
// const dataStructure: DataStructure = [
//     singleDataEntry,
//     singleDataEntry,
//     singleDataEntry,
//     singleDataEntry,
// ]

/*
Server/Node endpoints:
1. Fetch entire raw data structure
2. Return latest dataEntries by hash index. Request body includes the frontend's latest hash. Response will contain all data entries that have hashes that occured after the frontend's hash.
3. POST endpoint for building the `singleDataEntry`,for broadcasting `singleDataEntry`
4. POST endpoint for receiving user's signed message. This should do basic validation on the serverside (and frontend)
6. GET endpoint for all locally submitted user messages that have not yet been put into a `singleDataEntry`
 */

/*
1. Listener for submitted hashes:
If is GOOD hash:
- append to local datastructure
- remove `singleDataEntry` from mempool AND local "messages pool" if present
-

//Bad hash conditions: 1. Hash is not present in mempool
if Bad hash:
- do nothing


2. Listener for gossiped singleDataEntry
 - Validate the hash they submitted and ALSO the messages pass consensus "messages" rules, if GOOD then add to mempool
 */

const getLatestHash = (dataStructure: DataStructure, newMessages: Array<Message>): string => {
    const mostRecentHash = dataStructure[dataStructure.length - 1].hash
    return ethers.utils.sha256(newMessages.toString() + mostRecentHash)
}

//1.
export const getRawDataStructure = (): DataStructure => {
    return storage.dataStructure
}

//2.
export const getLatestDataEntries = (hash: string) => {
    //iterate from end to beginning
    for (let i = storage.dataStructure.length - 1; i > -1; i--) {
        const savedHash = storage.dataStructure[i].hash
        if (savedHash === hash) {
            return storage.dataStructure.slice(i + 1) //return all the data entries after
        }
    }
}

//3.
const buildSingleDataEntry = (messages: Array<Message>): DataEntry => {
    const hash = getLatestHash(storage.dataStructure, messages)
    return {
        hash,
        messages
    }
}

//4.


// send transaction with hash constructed from batch of messages
const unichatAddress = "0x47a1fc3ef4d00e9862724e4d2cbc96a35e26a803"; // TODO: update this to other networks as needed

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const unichatAbi = [
  // human-readable ABI for Unichat contract
  "function AddData(string memory _oldHash, string memory _newHash) payable public returns(bool)",
  
  "function WithdrawFunds(address payable _address) external returns(bool)",

  "event NewEntry(string _hash)",
  
];

const provider = new ethers.providers.JsonRpcProvider(process.env.URL);

const signer = provider.getSigner()

// The Contract object
const unichatContract = new ethers.Contract(unichatAddress, unichatAbi, provider);

const invokeAddData = (oldHash: string, newHash: string) => {

    const unichatWithSigner = unichatContract.connect(signer);

    const eth = ethers.utils.parseUnits("1.0", 18);

    const tx = unichatWithSigner.AddData(oldHash, newHash);

    return {
        oldHash
    }
}

