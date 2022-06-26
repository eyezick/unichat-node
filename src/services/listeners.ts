import {  unichatAbi, unichatAddress, unichatContract, signer, provider } from '../constants'

export const listenForEvents = () => {
    unichatContract.on("NewEntry", (hash, event) => {
        console.log(`New hash received: ${ hash}`);
        // The event object contains the verbatim log data, the
        // EventFragment and functions to fetch the block,
        // transaction and receipt and event functions
        return(hash)
    });
}