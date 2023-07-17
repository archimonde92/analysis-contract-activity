import { IndexDescription } from "mongodb"


const KafkaRawTransactionEventIndexes: IndexDescription[] = [
    { key: { transactionId: 1 }, unique: true, background: true },
    { key: { contractAddress: 1 }, background: true },
]

export {
    KafkaRawTransactionEventIndexes
}
