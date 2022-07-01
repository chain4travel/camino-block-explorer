<template>
  <div v-if="$route.params.addressId">
    <div class="row q-pa-md">
      <q-icon
        class="col-auto grey-color q-pt-xs"
        size="sm"
        name="mdi-file-document"
      ></q-icon>
      <div class="col-auto text-bold text-h6 q-pl-md">
        Address
        <LongString
          :value="$route.params.addressId"
          class="grey-color"
          :xlLength="50"
          :lgLength="50"
          :mdLength="50"
          :smLength="20"
          :xsLength="16"
        ></LongString>
      </div>
      <div
        :class="
          'col-sm-auto col-12' +
          ($q.screen.gt.xs ? ' flex items-center' : ' q-mt-xs')
        "
      >
        <CopyButton
          class="col-auto"
          style="float: right"
          :value="$route.params.addressId.toString()"
        />
      </div>
    </div>
    <div class="row q-pt-md justify-center">
      <q-card class="col">
        <q-card-section>
          <div class="row">
            <div class="col-auto">
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab
                  v-for="tab of tabs"
                  :key="tab.key"
                  :name="tab.key"
                  :label="tab.label"
                />
              </q-tabs>
              <q-separator />
            </div>
          </div>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="transactions" class="q-pa-none">
              <DetailsTable
                height="57vh"
                :columns="columns"
                :load-data="loadTransactions"
                :require-load-more="requireLoadMore"
                :store="store"
                title="C-Transaction"
              >
                <template v-slot:body-cell-direction="props">
                  <q-td :props="props">
                    <div>
                      <q-badge
                        :color="props.value === 'in' ? 'primary' : 'secondary'"
                        :label="props.value"
                      />
                    </div>
                    <div class="my-table-details">
                      {{ props.row.details }}
                    </div>
                  </q-td>
                </template>
              </DetailsTable>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-else>
    <error-not-found-page></error-not-found-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import DetailsTable from './DetailsTable.vue';
import { useRoute } from 'vue-router';
import ErrorNotFoundPage from 'src/pages/ErrorNotFoundPage.vue';
import { useCIndexStore } from 'src/stores/c-index-store';
import { getStringOrFirstElement } from 'src/utils/display-utils';
import { CAddressTransactionTableData } from 'src/types/transaction';
import {
  getTransactionDetailsPath,
  getAddressDetailsPath,
} from 'src/utils/route-utils';
import { ChainType } from 'src/types/chain-type';
import { CChainLoader } from 'src/types/chain-loader';
import CopyButton from 'src/components/ui/CopyButton.vue';
import LongString from './ui/LongString.vue';

const tabs = [
  {
    key: 'transactions',
    label: 'Transactions',
  },
];

export default defineComponent({
  name: 'CAddressDetails',
  async setup() {
    const route = useRoute();
    const address = getStringOrFirstElement(route.params.addressId);

    const allTxData: Ref<CAddressTransactionTableData[]> = ref([]);
    let moreToLoad = true;

    function detailsLink(item: string) {
      return `${getTransactionDetailsPath(ChainType.C_CHAIN, item)}?back=${
        route.fullPath
      }`;
    }

    return {
      tab: ref('transactions'),
      tabs,
      store: useCIndexStore(),

      async loadTransactions(
        store: CChainLoader,
        _: string[],
        __: number,
        limit: number,
        lastItem: CAddressTransactionTableData
      ): Promise<CAddressTransactionTableData[]> {
        const apiData = await (lastItem
          ? store.loadTransactions(
              lastItem.block,
              lastItem.index,
              limit,
              address
            )
          : store.loadTransactions(NaN, 0, limit, address));
        moreToLoad = apiData.length > 0;
        return apiData.map((elem) => {
          return {
            type: 0,
            age: elem.timestamp,
            block: elem.block,
            index: elem.index,
            from: elem.from,
            to: elem.to,
            txnFee: elem.transactionCost,
            txnHash: elem.hash,
            value: elem.value,
            direction: elem.from === address ? 'out' : 'in',
          };
        });
      },

      requireLoadMore(): boolean {
        return moreToLoad;
      },
      columns: [
        {
          name: 'direction',
          label: 'In/Out',
          field: 'direction',
          align: 'center',
        },
        {
          name: 'txnHash',
          label: 'Txn Hash',
          field: 'txnHash',
          align: 'center',
          type: 'hash',
          detailsLink: detailsLink,
        },
        {
          name: 'block',
          label: 'Block',
          field: 'block',
          align: 'center',
        },
        {
          name: 'age',
          label: 'Age',
          field: 'age',
          align: 'center',
          type: 'timestamp',
        },
        {
          name: 'from',
          label: 'From',
          field: 'from',
          align: 'center',
          type: 'hash',
          detailsLink: getAddressDetailsPath,
        },
        {
          name: 'to',
          label: 'To',
          field: 'to',
          align: 'center',
          type: 'hash',
          detailsLink: getAddressDetailsPath,
        },
        {
          name: 'value',
          label: 'Value',
          field: 'value',
          align: 'center',
          type: 'currency',
        },
        {
          name: 'txnFee',
          label: 'Txn Fee',
          field: 'txnFee',
          align: 'center',
          type: 'currency',
        },
      ],
    };
  },
  components: { DetailsTable, ErrorNotFoundPage, CopyButton, LongString },
});
</script>
