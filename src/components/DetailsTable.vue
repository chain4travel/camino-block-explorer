<template>
  <div :class="$q.screen.lt.md ? '' : 'q-pa-md'">
    <q-table :style="'height:'+ height" card-class="q-card" table-header-class="q-card" :grid="$q.screen.lt.md" class="sticky-headers "
      :title="title" :rows="data" :columns="columns" :loading="loading" row-key="index" virtual-scroll
      :virtual-scroll-item-size="48" :virtual-scroll-sticky-size-start="48" :rows-per-page-options="[0]"
      @virtual-scroll="onScroll">
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <div class="row justify-center" v-if="props.col && props.col.type === 'currency'">
            <div>
              <CamAmount style="min-width: 140px; max-width: 140px;" :value="props.value"></CamAmount>
            </div>
          </div>
          <div v-else-if="props.value && props.col && props.col.type === 'hash'">
            <AddressLink v-if="props.col.detailsLink" class="monospace" :to="props.col.detailsLink(props.value)"
              :value="props.value" :xl-length="30" :lg-length="25" :md-length="12" :sm-length="7" :xs-length="20">
            </AddressLink>
            <LongString v-else class="monospace" :value="props.value" :xl-length="50" :lg-length="25" :md-length="7"
              :sm-length="7" :xs-length="10"></LongString>
          </div>
          <div v-else-if="props.col && props.col.type === 'status'">
            <q-chip class="chip-placing">
              {{ props.value }}
            </q-chip>
          </div>
          <div v-else-if="props.col && props.col.type === 'timestamp'">
            <RelativeTime :value="props.value"></RelativeTime>
          </div>
          <div v-else-if="props.col && props.col.type === 'number'">
            {{ props.value.toLocaleString() }}
          </div>
          <div v-else class="overflow-handle">
            {{ props.value }}
          </div>
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-btn outline rounded color="primary" icon="mdi-refresh" @click="() => refresh()" />
      </template>
      <template v-slot:bottom>
        <q-btn outline v-if="backAddr" rounded color="primary" size="md" icon="mdi-chevron-left"
          @click="() => $router.push(backAddr)" />
      </template>
      <template v-slot:item="props">

        <div class="q-pa-xs col-xs-12 col-sm-12 col-md-4 col-lg-3 grid-style-transition">
          <q-card>
            <div class="q-py-sm">
              <q-list dense>
                <q-item v-for="col in props.cols" :key="col.name">
                  <div class="q-table__grid-item-row">
                    <div class="q-table__grid-item-title">{{ col.label }}</div>
                    <div class="q-table__grid-item-value">
                      <div class="row justify-center" v-if="col && col.type === 'currency'">
                        <div>
                          <CamAmount :value="col.value"></CamAmount>
                        </div>
                      </div>
                      <div v-else-if="col && col.value &&  col.type === 'hash'">
                        <AddressLink v-if="col.detailsLink" class="monospace"
                          :to="col.detailsLink(col.value)" :value="col.value" :xl-length="36" :lg-length="15"
                          :md-length="7" :sm-length="70" :xs-length="30">
                        </AddressLink>
                        <LongString v-else class="monospace" :value="col.value" :xl-length="36" :lg-length="36"
                          :md-length="7" :sm-length="70" :xs-length="30"></LongString>
                      </div>
                      <div v-else-if="col && col.type === 'status'">
                        <q-chip class="chip-placing">
                          {{ col.value }}
                        </q-chip>
                      </div>
                      <div v-else-if="col && col.type === 'timestamp'">
                        <RelativeTime :value="col.value"></RelativeTime>
                      </div>
                      <div v-else class="overflow-handle">
                        {{ col.value }}
                      </div>
                    </div>
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-card>
        </div>
        <q-infinite-scroll v-if="props.rowIndex === data.length - 1 && requireLoadMore(data)"
          @load="onScroll({ to: props.rowIndex })" :offset="15">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </template>
      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import { BlockTableData } from 'src/types/block';
import { ChainLoader } from 'src/types/chain-loader';
import AddressLink from './ui/AddressLink.vue';
import { getAddressDetailsPath } from 'src/utils/route-utils';
import LongString from './ui/LongString.vue';
import RelativeTime from './ui/RelativeTime.vue';
import CamAmount from './ui/CamAmount.vue';

const pageSize = 20;

export default defineComponent({
  name: 'DetailsTable',
  props: {
    store: { type: Object as PropType<ChainLoader>, required: true },
    title: { type: String, required: true },
    columns: { type: Array as PropType<Array<{ style?: string, width?: number }>>, required: true },
    loadData: { type: Function, required: true },
    requireLoadMore: { type: Function, required: true },
    backAddr: { type: String, requried: false },
    detailsLink: { type: Function, required: false },
    height: {type: String, default: '80vh'}
  },
  emits: ['row-clicked'],
  async setup(props) {
    const loading = ref(false);

    let knownHashes: string[] = [];
    const data: Ref<BlockTableData[]> = ref([]);
    const currentOffset = ref(0);
    async function refresh() {
      loading.value = true;
      currentOffset.value = 0;
      knownHashes = [];
      data.value = await props.loadData(props.store, knownHashes, currentOffset.value, pageSize);
      currentOffset.value += data.value.length;
      loading.value = false;
    }

    await refresh();

    return {
      getAddressDetailsPath,
      data: data,
      loading,
      pagination: { rowsPerPage: 0 },
      refresh,
      async onScroll({ to }: {
        to: number;
      }) {
        const lastIndex = data.value.length - 1;
        if (loading.value !== true && to === lastIndex && props.requireLoadMore()) {
          loading.value = true;
          const apiData = await props.loadData(props.store, knownHashes, currentOffset.value, pageSize);
          currentOffset.value += apiData.length || 0;
          data.value.push(...apiData);
          loading.value = false;
        }
      }
    };
  },
  components: { AddressLink, LongString, RelativeTime, CamAmount }
})
</script>

<style lang="sass">

.chip-placing
  margin-left: -10px
</style>
