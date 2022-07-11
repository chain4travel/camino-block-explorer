import { status } from 'types';
import { BlockDetail, BlockTableData } from './block';
import { CTransaction, TranscationDetails, XPTransaction } from './transaction';

export interface ChainOverviewType {
  numberOfTransactions: number;
  totalGasFees: number;
  numberOfActiveValidators: number;
  numberOfValidators: number;
  percentageOfActiveValidators: number;
  gasFeesLoading: status;
  transactionsLoading: status;
  validatorsLoading: status;
}

export interface initialCchainStateType {
  transactionCount: number;
  blockCount: number;
  blocks: BlockTableData[];
  transactions: CTransaction[];
  status: status;
  error: undefined | string;
  timeFrame: string;
  blockDetail?: BlockDetail;
  loadBlockDetial: status;
  loadTransactionDetails: status;
  transcationDetails?: TranscationDetails;
  ChainOverview: ChainOverviewType;
}

export interface initialXPchainStateType {
  xTransactions?: XPTransaction[];
  pTransactions?: XPTransaction[];
  xTransactionDetails?: XPTransaction;
  pTransactionDetails?: XPTransaction;
  loadXPTransactions: status;
  loadXTransactionDetials: status;
  loadPTransactionDetials: status;
  error: undefined | string;
  timeFrame: string;
  ChainOverview: ChainOverviewType;
}