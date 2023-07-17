import { MONGO_DB_NAME, MONGO_URI } from './../config';
import { connectTronWeb } from "./blockchain/tronweb";
import { connectMongo } from "./database/mongo/mongo";

const connectInfra = async () => {
    try {
        await Promise.all([
            connectMongo(MONGO_URI, MONGO_DB_NAME),
            connectTronWeb(),
        ])
    } catch (e) {
        throw e
    }
}

export {
    connectInfra
};
