import { CTransaction } from './transaction';

export interface ChainLoader {
  loadTransactions<T>(offset: number, count: number): Promise<T[]>;
  loadLatestBlocks<T>(limit: number, offset: number): Promise<T[]>;
  loadLatestTransactions<T>(limit: number, offset: number): Promise<T[]>;
}

export interface CChainLoader {
  loadTransactions(
    startBlock: number,
    transactionId: number,
    count: number,
    address: string
  ): Promise<CTransaction[]>;
  getNextTransactionHash(
    address: string,
    blockNumber: number,
    transactionId: number,
    backward: boolean
  ): Promise<string>;
}

export interface ChainOverviewLoader {
  getNumberOfValidators(): Promise<number>;
  loadNumberOfTransactions(timeframe: Timeframe): Promise<number>;
  loadTotalGasFess(timeframe: Timeframe): Promise<number>;
}

export enum Timeframe {
  HOURS_24 = 'HOURS_24',
  DAYS_7 = 'DAYS_7',
  MONTHS_1 = 'MONTHS_1',
}

export function getLabel(timeframe: Timeframe) {
  switch (timeframe) {
    case Timeframe.HOURS_24:
      return '24 Hours';
    case Timeframe.DAYS_7:
      return '7 Days';
    case Timeframe.MONTHS_1:
      return '1 Month';
    default:
      return 'UNKNOWN';
  }
}
