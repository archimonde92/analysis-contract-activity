import { collections } from "../mongo"

/**
 * @param address 
 * @param session 
 * @returns 
 */

const getDAO = () => ({
    common: collections.contract_statistic,
})

type DAOType = ReturnType<typeof getDAO>

export {
    getDAO as getContractStatisticDAO,
    DAOType as ContractStatisticType
}
