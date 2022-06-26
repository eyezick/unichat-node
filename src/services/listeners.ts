import { onNewEntry } from '.';
import {  getContractReference } from './provider'

export const listenForEvents = () => {
    console.log('should belistening')
    const unichatContract = getContractReference()
    unichatContract.on("NewEntry", (hash, event) => {
        console.log(`New hash received: ${ hash}`);
        // The event object contains the verbatim log data, the
        // EventFragment and functions to fetch the block,
        // transaction and receipt and event functions
        onNewEntry(hash, event)
    });
}