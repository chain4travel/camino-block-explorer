import * as React from 'react';
import { ChainType } from 'utils/types/chain-type';
import { fetchXPTransactions } from 'store/xchainSlice/utils';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  selectAllPTransactions,
  getXPchainStatus,
  getXPchainOverreview,
} from 'store/xchainSlice';
import { loadValidators } from 'store/cchainSlice/utils';
import PageContainer from 'app/components/PageContainer';
import OverviewCards from '../../components/OverviewCards';
import XPTransactionList from 'app/components/XChainPageComponents/XPTransactionList';
import XPTransactionItem from 'app/components/XChainPageComponents/XPTransactionItem';
import XPItemDivider from 'app/components/XChainPageComponents/XPItemDivider';
import DataControllers from 'app/components/DataControllers';
import LoadingWrapper from 'app/components/LoadingWrapper';

const CHAIN_ID = '11111111111111111111111111111111LpoYY';

export default function PChainPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectAllPTransactions);
  const status = useAppSelector(getXPchainStatus);
  const {
    numberOfTransactions,
    totalGasFees,
    numberOfActiveValidators,
    numberOfValidators,
    percentageOfActiveValidators,
    gasFeesLoading,
    transactionsLoading,
    validatorsLoading,
  } = useAppSelector(getXPchainOverreview);
  useEffectOnce(() => {
    dispatch(fetchXPTransactions({ chainID: CHAIN_ID, chainType: 'p' }));
    dispatch(loadValidators());
  });

  return (
    <PageContainer pageTitle="P chain" metaContent="chain-overview p-chain">
      <DataControllers />
      <OverviewCards
        numberOfTransactions={numberOfTransactions}
        totalGasFees={totalGasFees}
        numberOfActiveValidators={numberOfActiveValidators}
        numberOfValidators={numberOfValidators}
        percentageOfActiveValidators={percentageOfActiveValidators}
        gasFeesLoading={gasFeesLoading}
        transactionsLoading={transactionsLoading}
        validatorsLoading={validatorsLoading}
      />
      <XPTransactionList ShowAllLink="p-chain">
        <LoadingWrapper
          loading={status}
          failedLoadingMsg="Failed to load transactions"
        >
          {transactions?.map((transaction, index) => (
            <XPItemDivider
              index={index}
              max={transactions.length - 1}
              key={index}
            >
              <XPTransactionItem
                chainType={ChainType.P_CHAIN}
                data={transaction}
              />
            </XPItemDivider>
          ))}
        </LoadingWrapper>
      </XPTransactionList>
    </PageContainer>
  );
}
