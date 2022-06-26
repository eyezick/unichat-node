import { validMessage } from './'
import { DataEntry } from '../types'
type ConsensusRule = (dataEntry: DataEntry) => boolean

export const rules: Array<ConsensusRule> = []

const totalCharLimit: ConsensusRule = (dataEntry) => {
    console.log(1)
    const totalCharAmount = dataEntry.messages.reduce((amount, message) => {
        return amount + message.text.length
    }, 0)
    return totalCharAmount < 5000
}


const perMessageLimit: ConsensusRule = (dataEntry) => {
    console.log(2)
    return dataEntry.messages.every(m => m.text.length <= 240)
}

const allValidMessages: ConsensusRule = (dataEntry) => {
    console.log(3)
    return dataEntry.messages.every(validMessage)
}

rules.push(totalCharLimit)
rules.push(perMessageLimit)
rules.push(allValidMessages)