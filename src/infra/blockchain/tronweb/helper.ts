import { tronWeb } from "."
import { TronTransactionInfoType, TronTransactionType } from "./TronWebProvider.i"

enum TransferTrxMessageDecodeStatus {
    valid = 'valid',
    invalid_message_type = 'invalid_message_type',
    invalid_param_length = 'invalid_param_length',
    invalid_api_key = 'invalid_api_key',
}
type TransferTrxMessageDecodeResult = {
    status: TransferTrxMessageDecodeStatus
    message: string //deposit.api_key
    type?: string,
    data?: {
        api_key: string
    }
}

const decodeRevertMessageTron = (messageHex: string) => {
    try {
        const encodedResult = messageHex.substring(messageHex.length - 64, messageHex.length)
        let resMessage = Buffer.from(encodedResult, "hex").toString("utf8").replace(/\0/g, "")
        return resMessage
    } catch {
        return messageHex
    }
}
const getTransactionInfo = async (hex: string) => {
    const data = await tronWeb.trx.getTransactionInfo(hex) as TronTransactionInfoType
    return data
}

const getTransaction = async (hex: string) => {
    const data = await tronWeb.trx.getTransaction(hex) as TronTransactionType
    return data
}

const getTronAddressFromHex = (hex: string) => tronWeb.address.fromHex(hex)


export {
    getTransactionInfo,
    getTransaction,
    getTronAddressFromHex,
    decodeRevertMessageTron as decodeResMessageTron,
}
