interface IBlockchainProvider {
    /**
     * Check one address is valid blockchain address
     * @param address string
     * @returns boolean
     */
    isAddress: (address: string) => boolean
    /**
     * Get public key from private key of the address
     * @param private_key string
     * @returns string (in public key)
     */
    getPublicKeyByPrivateKey: (private_key: string) => string
    /**
     * Get transaction data by txid. 
     * @param txid string
     * @returns Type of Transaction 
     */
    getTransaction: <T>(txid: string) => Promise<T>
    getBlock: <T>(block: string | number) => Promise<T>
}


export { IBlockchainProvider }