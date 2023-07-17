import { KafkaMessage } from "kafkajs";
import { ClientSession } from "mongodb";
import { START_PROJECT_BLOCK } from "../../../config";
import { TKafkaRawTransactionEvent } from "../../blockchain/tronweb/TronWebProvider.i";
import { collections, mongo } from "../../database/mongo/mongo";

let currentBlockNumber = 0
const setCurrentBlockNumber = (blockNumber: number) => {
    if (currentBlockNumber < blockNumber) {
        currentBlockNumber = blockNumber
    }
}

const updateStatisticTransaction = async (event: TKafkaRawTransactionEvent, session?: ClientSession) => {
    const { contractAddress, triggerName } = event
    if (triggerName === "transactionTrigger" && contractAddress) {
        console.log(event.transactionId)
        await collections.kafka_raw_transaction_events.insertOne(event)
    }
}

const checkMustBeGreaterThanStartBlock = (blockNumber: number) => {
    if (blockNumber < START_PROJECT_BLOCK) throw new Error("MUST GREATER THAN START BLOCK")
}

export const TransactionHandler = async (message: KafkaMessage) => {
    const session = mongo.startSession()
    try {

        const event: TKafkaRawTransactionEvent = JSON.parse(message.value?.toString() || "")
        const { blockNumber } = event

        //Checking
        setCurrentBlockNumber(blockNumber)
        checkMustBeGreaterThanStartBlock(blockNumber)
        await updateStatisticTransaction(event, session)

    } catch (e: any) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}

