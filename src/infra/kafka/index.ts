import { EachMessagePayload, Kafka, RetryOptions } from "kafkajs";
import { KAFKA_BROKER, KAFKA_CLIENT_ID, KAFKA_GROUP_ID } from "../../config";
import { TransactionHandler } from "./handler/handler.transaction";


const retry_options: RetryOptions = {
    maxRetryTime: 60000,
    initialRetryTime: 300,
    factor: 0.1,
    retries: 1000,

}
const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: [KAFKA_BROKER],
    ssl: false,
    sasl: undefined,
    connectionTimeout: 5000,
    requestTimeout: 60000,
    retry: retry_options,
    logLevel: 2
})


const startKafkaConsumer = async () => {
    try {
        const kafkaConsumer = await kafka.consumer({ groupId: KAFKA_GROUP_ID, allowAutoTopicCreation: true })
        console.log(`🚀 - Kafka master ${KAFKA_BROKER} with group_id=${KAFKA_GROUP_ID} consumer connected`)

        await kafkaConsumer.subscribe({ topic: 'transaction', fromBeginning: false });
        console.log(`🚀 - Topic transaction subscribed`);

        await kafkaConsumer.run({
            eachMessage: async (payload: EachMessagePayload) => {
                try {
                    const { message, topic } = payload;
                    switch (topic) {
                        case "transaction":
                            await TransactionHandler(message)
                            break;

                        default: throw new Error(`consumer for topic ${topic} not found`)
                    }

                } catch (e) {
                    console.log(e)
                    throw e
                }
            },
        });


    } catch (e) {
        console.error(`kafka consumer disconnected`);
        throw e;
    }
}




export { startKafkaConsumer };

