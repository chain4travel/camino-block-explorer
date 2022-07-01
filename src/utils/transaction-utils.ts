import { ChainType } from 'src/types/chain-type';
import { TranscationDetail } from 'src/types/transaction';
import { getTransactionDetailsPath } from 'src/utils/route-utils';

export type TxHashItem = {
  hash: string;
  blockNumber: number;
  transactionId: number;
};

export function getTransactionIndex(
  transaction: TranscationDetail,
  store: TxHashItem[]
) {
  const index = store.findIndex((t) => t.hash === transaction.hash);
  return index;
}

export function getNextPrevPath(
  store: TxHashItem[],
  index: number,
  next: boolean
) {
  if (next) {
    return getTransactionDetailsPath(ChainType.C_CHAIN, store[index + 1].hash);
  } else {
    return getTransactionDetailsPath(ChainType.C_CHAIN, store[index - 1].hash);
  }
}
