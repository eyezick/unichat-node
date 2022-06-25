export interface Message {
    signature: string, //this signature signs all the other fields in the message
    from: string,
    to: string,
    time: number, //unix timestamp in SECONDS not MILLISECONDS
    text: string,
    cid: string
}

export interface DataEntry {
    hash: string
    messages: Array<Message>
}

export type DataStructure = Array<DataEntry>
