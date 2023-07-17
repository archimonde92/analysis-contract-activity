import { IBlockchainProvider } from "../BlockchainProvider.i";
import { EActivePermission } from "./enum";

type TEnumResourceType = "ENERGY" | "BANDWIDTH"

type TronTransactionInfoType = {
    id: string
    fee: number
    blockNumber: number
    blockTimeStamp: number
    contractResult: string[]
    contract_address: string
    receipt: {
        energy_fee?: number
        energy_usage_total?: number
        net_fee?: number
        net_usage?: number
        result?: string
        energy_penalty_total?: number
    },
    log: {
        address: string
        topics: string[]
        data: string
    }
    packingFee: number
}

type TDelegatedParameterValue = {
    receiver_address?: string
    balance?: number //in sun
    resource?: TEnumResourceType
    lock?: boolean,
    lock_period?: number, //in sec
    visible?: boolean
}

type TTronRawTransaction = {
    txID: string,
    raw_data: {
        contract: {
            parameter: {
                value: {
                    amount?: number
                    data?: string,
                    owner_address: string,
                    contract_address?: string,
                    to_address?: string
                    frozen_balance?: number
                    unfreeze_balance?: number
                } & TDelegatedParameterValue,
                type_url: string
            },
            type: "TriggerSmartContract" | "TransferContract" | 'DelegateResourceContract' | 'FreezeBalanceV2Contract' | 'UnfreezeBalanceV2Contract' | "UnDelegateResourceContract"
        }[],
        ref_block_bytes: string
        ref_block_hash: string
        expiration: number
        fee_limit: number
        timestamp: number
    },
    raw_data_hex: string
}


type TTronSignedTransaction = {
    signature: string[]
} & TTronRawTransaction

type TronTransactionType = {
    ret: { contractRet: "SUCCESS" | string }[],
} & TTronSignedTransaction

type TronGetAccountResources = {
    freeNetLimit: number
    TotalNetLimit: number
    TotalNetWeight: number
    TotalEnergyLimit: number
    TotalEnergyWeight: number
    freeNetUsed: number
    tronPowerUsed: number
    tronPowerLimit: number
    NetUsed: number
    NetLimit: number
    EnergyUsed: number
    EnergyLimit: number
}

type TronGetAccount = {
    address: string,
    balance: number,
    votes: {
        vote_address: string,
        vote_count: number
    }[]
    frozen: { frozen_balance: number, expire_time: number }[],
    create_time: number,
    latest_opration_time: number,
    latest_consume_free_time: number,
    net_usage: number,
    latest_withdraw_time: number,
    latest_consume_time: number,
    net_window_size: number,
    account_resource: {
        frozen_balance_for_energy: { frozen_balance: number, expire_time: number },
        latest_consume_time_for_energy: number,
        acquired_delegated_frozenV2_balance_for_energy: number,
        energy_window_size: number
    },
    owner_permission: {
        permission_name: string,
        threshold: number,
        keys: {
            address: string,
            weight: number
        }[]
    },
    active_permission: {
        type: string,
        id: number,
        permission_name: string,
        threshold: number,
        operations: string,
        keys: {
            address: string,
            weight: number
        }[]
    }[],
    frozenV2: { amount: number, type: string }[]
    unfrozenV2: {
        type: string
        unfreeze_amount: number
        unfreeze_expire_time: number
    }[]
    assetV2: { key: string, value: number }[]
    free_asset_net_usageV2: [{ key: string, value: number }]
    acquired_delegated_frozen_balance_for_bandwidth: number
    asset_optimized: boolean
}

type TSendTrx = {
    result: boolean,
    txid: string,
    transaction: {
        txID: string,
        raw_data: {
            contract: [
                {
                    parameter: {
                        value: {
                            amount: number,
                            owner_address: string,
                            to_address: string
                        },
                        type_url: string
                    },
                    type: string,
                    Permission_id: number
                }
            ],
            ref_block_bytes: string,
            ref_block_hash: string,
            expiration: number,
            timestamp: number
        },
        raw_data_hex: string,
        signature: string[]
    }
}

type TActionPermission = keyof typeof EActivePermission

type TTronBlock = {
    blockID: string,
    block_header: {
        raw_data: {
            number: number
            txTrieRoot: string,
            witness_address: string
            parentHash: string
            version: number,
            timestamp: number
        }
        witness_signature: string
    }
    transactions: TronTransactionType[]
}

interface ITronWebProvider extends IBlockchainProvider {
    /**
     * Get transaction information by id
     * @param txid string
     * @returns transaction information data 
     */
    getTransactionInfo: (txid: string) => Promise<TronTransactionType>
    getTronAddressFromHex: (hex: string) => string
    getBalance: (address: string) => Promise<number>
    getAccount: (address: string) => Promise<TronGetAccount>
    getAccountResources: (address: string) => Promise<TronGetAccountResources>
    freezeBalanceV2: (amount: number, resource: "BANDWIDTH" | "ENERGY", address: string, options: any) => Promise<TronTransactionType>
    unFreezeBalanceV2: (amount: number, resource: "BANDWIDTH" | "ENERGY", address: string, options: any) => Promise<TronTransactionType>
}

type TKafkaRawTransactionEvent = {
    "timeStamp": number, //1622534112000,
    "triggerName": "transactionTrigger" | Omit<string, "transactionTrigger">, //"transactionTrigger", 
    "transactionId": string, //"38b9e0a2b85dde571fc2f98dc72f7ea3aab23637714e9c5116ee0b1b18d517d1", 
    "blockHash": string, //"0000000000fb976267a6e7ac5808c4246569fcf655e22a12d85110bc3e11d04f",
    "blockNumber": number, //16488290,
    "energyUsage": number, //0,
    "energyFee": number, //0,
    "originEnergyUsage": number,//0,
    "energyUsageTotal": number,//0,
    "netUsage": number, //0,
    "netFee": number, //0,
    "result": string, //"SUCCESS",
    "contractAddress"?: string, //null,
    "contractType": string, //"TransferContract",
    "feeLimit"?: number, //0,
    "contractCallValue"?: number, //0,
    "contractResult"?: string, //null,
    "fromAddress"?: string, //"TFQxDmUw9U27M3ZK47bezTYUsBjp4ZtS2i",
    "toAddress"?: string, //"TTWjJvmytqHNE3Pi6iz8zsNMy4t3MGupNY",
    "assetName"?: string, //"trx",
    "assetAmount"?: number, //1000,
    "latestSolidifiedBlockNumber"?: number, //16488272,
    "data"?: string, //"74657374206d656d6f"
    decode_response?: any
}

export {
    ITronWebProvider,
    TronTransactionInfoType,
    TTronRawTransaction,
    TTronSignedTransaction,
    TronTransactionType,
    TronGetAccountResources,
    TronGetAccount,
    TActionPermission,
    TSendTrx,
    TTronBlock,
    TKafkaRawTransactionEvent
};
