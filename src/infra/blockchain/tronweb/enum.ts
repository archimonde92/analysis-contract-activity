enum EActivePermission {
    AccountCreateContract = 0, // create Account
    TransferContract = 1,  //TRX transfer
    TransferAssetContract = 2, // TRC-10 token transfer
    VoteAssetContract = 3, //unused
    VoteWitnessContract = 4, //Vote for Super Representatives
    WitnessCreateContract = 5, //Apply to be a Super Representative Candidate
    AssetIssueContract = 6, // Issue TRC-10 Tokens
    WitnessUpdateContract = 8, //Update website URLs for Super Representative candidates
    ParticipateAssetIssueContract = 9,//	Buy TRC-10 Tokens
    AccountUpdateContract = 10,	//update account name
    FreezeBalanceContract = 11,	//Stake1.0 stake
    UnfreezeBalanceContract = 12, //Unstake TRX staked in Stake1.0 phase
    WithdrawBalanceContract = 13, //Withdraw rewards
    UnfreezeAssetContract = 14,	//Unfreeze issued TRC10 tokens
    UpdateAssetContract = 15,	//Update TRC10 token parameters
    ProposalCreateContract = 16,	//Create proposal
    ProposalApproveContract = 17,//	Approve proposal
    ProposalDeleteContract = 18,	//Delete propossal
    SetAccountIdContract = 19,	//Set account ID
    CreateSmartContract = 30,	//Create a smart contract
    TriggerSmartContract = 31, //	Trigger smart contract
    UpdateSettingContract = 33,	//Update consume_user_resource_percent
    ExchangeCreateContract = 41, //Create an exchange
    ExchangeInjectContract = 42, //	Exchange Inject
    ExchangeWithdrawContract = 43, //	Exchange Withdraw
    ExchangeTransactionContract = 44, //Bancor Transaction
    UpdateEnergyLimitContract = 45,	//Adjust the energy limit provided by the smart contract deployer
    AccountPermissionUpdateContract = 46, //Update account permissions
    ClearABIContract = 48,	//Clear contract ABI
    UpdateBrokerageContract = 49, //Update SR Brokerage
    ShieldedTransferContract = 51, // Shielded transactions
    FreezeBalanceV2Contract = 54, // Stake TRX
    UnfreezeBalanceV2Contract = 55,// Unstake TRX
    WithdrawExpireUnfreezeContract = 56,// Withdraw the unstaked principal that has passed the lock-up period
    DelegateResourceContract = 57,// Resource delegate
    UnDelegateResourceContract = 58,// Cancel resource delegate
}
export { EActivePermission }