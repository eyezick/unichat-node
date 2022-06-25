import { ethers } from "ethers";
import { Message, DataEntry , DataStructure} from '../types'
import { cache, storage } from '../store'

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


