import { connectInfra } from "./infra"
import { startKafkaConsumer } from "./infra/kafka"

const main = async () => {
    await connectInfra()
    await startKafkaConsumer()
}

main()