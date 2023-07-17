import { EVENT_SERVER, FULL_NODE, SOLIDITY_NODE } from "../../../config";
import { successConsoleLog } from "../../../lib/color-log";
import { TronWebProvider } from './TronWebProvider';
const TronWeb = require('tronweb')

let tronWeb: any
let tronWebProvider: TronWebProvider
let forwarderContract: any
let wTrxContract: any
let relayHubContract: any
let resourceContract: any
let botAddress: string
let FUND_DEPOSIT_ADDRESS: string
let TRONSAVE_DEPOSIT_ADDRESS: string

const connectTronWeb = async () => {
    try {
        tronWeb = new TronWeb({
            fullNode: FULL_NODE,
            solidityNode: SOLIDITY_NODE,
            eventServer: EVENT_SERVER,
        })

        tronWebProvider = new TronWebProvider(tronWeb)
        successConsoleLog(`tronWeb: Connected`)
    } catch (e) {
        throw e
    }
}

export { connectTronWeb, tronWeb, tronWebProvider, forwarderContract, wTrxContract, relayHubContract, resourceContract, botAddress, FUND_DEPOSIT_ADDRESS, TRONSAVE_DEPOSIT_ADDRESS };

