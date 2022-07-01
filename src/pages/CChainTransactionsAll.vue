<template>
  <!-- content -->
  <div class="row">
    <div class="col-12">
      <DetailsTable
        :back-addr="backAddr"
        :load-data="loadTransactions"
        :require-load-more="requireLoadMore"
        :columns="columns"
        title="C-Transaction"
        :store="store"
      >
      </DetailsTable>
    </div>
  </div>
</template>

<script lang="ts">
import { useCIndexStore } from 'src/stores/c-index-store';
import { ChainType } from 'src/types/chain-type';
import {
  getAllTransactionsPath,
  getOverviewPath,
  getTransactionDetailsPath,
  getAddressDetailsPath,
  getBlockDetailsPath,
} from 'src/utils/route-utils';
import { defineComponent } from 'vue';
import { CTransaction, TransactionTableData } from 'src/types/transaction';
import { CChainLoader } from 'src/types/chain-loader';
import DetailsTable from '../components/DetailsTable.vue';

function mapToTableData(transaction: CTransaction): TransactionTableData {
  return {
    blockNumber: transaction.block,
    transactionIndex: transaction.index,
    from: transaction.from,
    hash: transaction.hash,
    status: transaction.status,
    timestamp: transaction.timestamp,
    to: transaction.to,
    value: transaction.value,
    transactionCost: transaction.transactionCost,
  };
}

export default defineComponent({
  name: 'CChainTransactionsAll',
  async setup() {
    function transactionDetails(item: string) {
      return `${getTransactionDetailsPath(
        ChainType.C_CHAIN,
        item
      )}?back=${getAllTransactionsPath(ChainType.C_CHAIN)}`;
    }
    function addressDetails(item: string) {
      return `${getAddressDetailsPath(item)}?back=${getAllTransactionsPath(
        ChainType.C_CHAIN
      )}`;
    }
    function blockDetails(item: string) {
      return `${getBlockDetailsPath(
        ChainType.C_CHAIN,
        item
      )}?back=${getAllTransactionsPath(ChainType.C_CHAIN)}`;
    }
    let moreToLoad = true;
    return {
      store: useCIndexStore(),
      backAddr: getOverviewPath(ChainType.C_CHAIN),
      requireLoadMore(): boolean {
        return moreToLoad;
      },
      async loadTransactions(
        store: CChainLoader,
        _: string[],
        __: number,
        limit: number,
        lastItem: TransactionTableData
      ) {
        const apiData = await (lastItem
          ? store.loadTransactions(
              lastItem.blockNumber,
              lastItem.transactionIndex,
              limit,
              ''
            )
          : store.loadTransactions(NaN, 0, limit, ''));
        moreToLoad = apiData.length > 0;
        return apiData.map(mapToTableData);
      },
      columns: [
        {
          name: 'blockNumber',
          label: 'Block',
          field: 'blockNumber',
          align: 'center',
          type: 'hash',
          detailsLink: blockDetails,
        },
        {
          name: 'from',
          label: 'From',
          field: 'from',
          align: 'center',
          type: 'hash',
          detailsLink: addressDetails,
        },
        {
          name: 'to',
          label: 'To',
          field: 'to',
          align: 'center',
          type: 'hash',
          detailsLink: addressDetails,
        },
        {
          name: 'hash',
          label: 'Hash',
          field: 'hash',
          align: 'center',
          type: 'hash',
          detailsLink: transactionDetails,
        },
        {
          name: 'timestamp',
          label: 'Timestamp',
          field: 'timestamp',
          align: 'center',
          type: 'timestamp',
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'center',
          type: 'status',
        },
        {
          value: 'transactionCost',
          label: 'Transaction Cost',
          field: 'transactionCost',
          align: 'center',
          type: 'currency',
        },
        {
          value: 'value',
          label: 'Value',
          field: 'value',
          align: 'center',
          type: 'currency',
        },
      ],
    };
  },
  components: { DetailsTable },
});
</script>
