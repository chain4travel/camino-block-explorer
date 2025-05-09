import { Status } from 'types'
import { BlockDetail, BlockTableData } from './block'
import { MagellanTransaction } from './magellan-types'
import { CTransaction, TranscationDetails, XPTransaction } from './transaction'
import { LocationNode, NodesPerCountry, NodesPerCity } from './locationNode'
import { Moment } from 'moment'

export interface Chain {
    chainID: string
    chainAlias: string
    vm: string
    avaxAssetID: string
    networkID: number
}
export interface ChainOverviewType {
    numberOfTransactions: number
    totalGasFees: number
    numberOfValidators: number
    gasFeesLoading: Status
    transactionsLoading: Status
}

export interface Network {
    /** Whether credentials should be included with requests */
    withCredentials: boolean
    /** Unique identifier for the network */
    id: number
    /** Human-readable name of the network */
    name: string
    /** URL for the network explorer API */
    explorerUrl: string
    /** URL for the network explorer website */
    explorerSiteUrl: string
    /** URL for the SignaVault service */
    signavaultUrl: string
    /** Network protocol (http/https) */
    protocol: string
    /** Network port */
    port: number
    /** Network IP address or hostname */
    ip: string
    /** Complete URL to access the network */
    url: string
    /** Network ID (may be null for some networks) */
    networkId: number | null
    /** Whether the network is in read-only mode */
    readonly: boolean
}

export interface initialCchainStateType {
    transactionCount: number
    currentIndex: number
    blockCount: number
    blocks: BlockTableData[]
    transactions: CTransaction[]
    transactionsNavigation: MagellanTransaction[]
    loadNextPrevStatus: Status
    status: Status
    error: undefined | string
    timeFrame: string
    blockDetail?: BlockDetail
    loadBlockDetial: Status
    loadTransactionDetails: Status
    transcationDetails?: TranscationDetails
    ChainOverview: ChainOverviewType
    miner: undefined | string
    sha3Uncles: undefined | string
    nonce: undefined | string
    stateRoot: undefined | string
    difficulty: undefined | number
    gasLimit: undefined | string
    // receiptsRoot: undefined | string;
    // logsBloom: undefined | string;
    // mixHash: undefined | string;
    // extDataHash: undefined | string;
    // extDataGasUsed: undefined | string;
    // blockGasCost: undefined | string;
    // transactionsRoot: undefined | string;
}

export interface initialValidatorsStateType {
    percentageOfActiveValidators: number
    numberOfActiveValidators: number
    numberOfValidators: number
    validatorsLoading: Status
    validators: ValidatorType[]
    locationNodes: LocationNode[]
    nodesPerCountry: NodesPerCountry[]
    nodesPerCity: NodesPerCity[]
}

export interface ValidatorType {
    status: string
    nodeID: string
    startTime: Moment
    endTime: Moment
    txID: string
    uptime: string
    lng: number
    lat: number
    country: string
    city: string
    alpha2: string
    ip: string
    connected?: boolean
    nodeIdentity: string
}

interface assets {
    name: string
    symbol: string
}
export interface initialXPchainStateType {
    xTransactions?: XPTransaction[]
    pTransactions?: XPTransaction[]
    xTransactionDetails?: XPTransaction
    pTransactionDetails?: XPTransaction
    loadXPTransactions: Status
    loadXTransactionDetials: Status
    loadPTransactionDetials: Status
    error: undefined | string
    xTimeFrame: string
    pTimeFrame: string
    assets?: assets[]
    XChainOverview: ChainOverviewType
    PChainOverview: ChainOverviewType
}
