import { ContractStatisticType, getContractStatisticDAO } from "./dao.contract_statistic";
type DAOType = {
    contract_statistic: ContractStatisticType,

}

let DAO: DAOType = new Object() as any

const initDAO = () => {
    console.log(`init DAO ...`)
    DAO.contract_statistic = getContractStatisticDAO()

}

export {
    initDAO,
    DAO
};

