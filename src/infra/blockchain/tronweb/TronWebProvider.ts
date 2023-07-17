import { ITronWebProvider, TronGetAccount, TronGetAccountResources, TronTransactionType } from "./TronWebProvider.i"

class TronWebProvider implements ITronWebProvider {
    constructor(public _tronweb: any) {
        if (!_tronweb) throw new Error("Must be provide tronweb instance")
    }
    getBlock: <T>(block: string | number) => Promise<T> = async (block) => {
        return this._tronweb.trx.getBlock(block)
    }


    getBalance: (address: string) => Promise<number> = async (address) => {
        return this._tronweb.trx.getBalance(address)
    }
    isAddress: (address: string) => boolean = (address: string) => {
        return this._tronweb.isAddress(address) as boolean
    }
    getPublicKeyByPrivateKey: (private_key: string) => string = (private_key: string) => {
        return this._tronweb.address.fromPrivateKey(private_key)
    }

    getTransaction: <T>(txid: string) => Promise<T> = (txid: string) => {
        return this._tronweb.trx.getTransaction(txid)
    }

    getTransactionInfo: (txid: string) => Promise<TronTransactionType> = (txid: string) => this._tronweb.trx.getTransactionInfo(txid)

    getTronAddressFromHex: (hex: string) => string = (hex: string) => this._tronweb.address.fromHex(hex)

    getAccount: (address: string) => Promise<TronGetAccount> = async (address: string) => await this._tronweb.trx.getAccount(address)

    getAccountResources: (address: string) => Promise<TronGetAccountResources> = async (address) => await this._tronweb.trx.getAccountResources(address);

    freezeBalanceV2: (amount: number, resource: "BANDWIDTH" | "ENERGY", address: string, options: any) => Promise<TronTransactionType> = () => { return "" as any }
    unFreezeBalanceV2: (amount: number, resource: "BANDWIDTH" | "ENERGY", address: string, options: any) => Promise<TronTransactionType> = () => { return "" as any }

}


export { TronWebProvider }
