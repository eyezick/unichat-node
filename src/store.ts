import { Message, DataStructure, DataEntry} from './types'

export const cache: {
    memPool: Array<DataEntry>,
    localMessages: Array<Message>
} = {
    memPool: [],
    localMessages: []
};

export const storage: { dataStructure: DataStructure } = {
    dataStructure : []
}