import { config } from "dotenv";

const path = ".env"
console.table({ env_path: path })
config({ path })

import { getEnvString, getIntFromEnv } from "./lib/config.helper"

export const FULL_NODE = getEnvString("FULL_NODE")
export const SOLIDITY_NODE = getEnvString("SOLIDITY_NODE")
export const EVENT_SERVER = getEnvString("EVENT_SERVER")
export const KAFKA_CLIENT_ID = getEnvString("KAFKA_CLIENT_ID")
export const KAFKA_BROKER = getEnvString("KAFKA_BROKER")
export const KAFKA_GROUP_ID = getEnvString("KAFKA_GROUP_ID")
export const START_PROJECT_BLOCK = getIntFromEnv("START_PROJECT_BLOCK")
export const MONGO_URI = getEnvString("MONGO_URI")
export const MONGO_DB_NAME = getEnvString("MONGO_DB_NAME")

export const IS_DEBUG = true
export const SERVER_CODE = "TEST"
export const DEBUG_LEVEL = ["info", "warning", "error", "table"]
