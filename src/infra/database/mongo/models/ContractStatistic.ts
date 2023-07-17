import { IndexDescription } from "mongodb"

type TContractStatistic = {
    address: string
    energy_consume: number
    energy_burn: number
    create_at: Date
    update_at: Date
}

const ContractStatisticIndexes: IndexDescription[] = [
    { key: { address: 1 }, background: true },
    { key: { energy_consume: 1 }, background: true },
    { key: { energy_burn: 1 }, background: true },
]


export {
    TContractStatistic,
    ContractStatisticIndexes
}