import axios from 'axios';
import { defineStore } from 'pinia';
import { XPTransaction } from 'src/types/transaction';
import { getMagellanBaseUrl } from 'src/utils/client-utils';
import { useMagellanTxStore } from './magellan-tx-store';
import { assets, addresses } from 'src/utils/magellan-api-utils';
import {
  MagellanAssetsResponse,
  MagellanAddressResponse,
} from 'src/types/magellan-types';
import { AddressBalance } from 'src/types/address';

export const useAddressStore = defineStore('address', {
  state: () => ({
    magellanStore: useMagellanTxStore(),
    assets: undefined as
      | Map<string, { name: string; symbol: string }>
      | undefined,
  }),
  getters: {},
  actions: {
    async loadXpTransactions(
      address: string,
      chain: string,
      offset: number,
      limit: number
    ): Promise<XPTransaction[]> {
      return this.magellanStore.loadTransactions(chain, offset, limit, address);
    },
    async loadAssets(): Promise<Map<string, { name: string; symbol: string }>> {
      if (this.assets) {
        return this.assets;
      }
      const loadedAssets: MagellanAssetsResponse = await (
        await axios.get(`${getMagellanBaseUrl()}${assets}`)
      ).data;
      const newElements = new Map();
      if (loadedAssets.assets) {
        loadedAssets.assets.forEach((element) => {
          newElements.set(element.id, {
            name: element.name,
            symbol: element.symbol,
          });
        });
      }
      this.assets = newElements;
      return this.assets;
    },
    async loadBalances(address: string): Promise<AddressBalance[]> {
      const assets = await this.loadAssets();
      const addressInfo: MagellanAddressResponse = await (
        await axios.get(`${getMagellanBaseUrl()}${addresses}/${address}`)
      ).data;
      const addressBalances: AddressBalance[] = [];
      if (addressInfo && addressInfo.assets) {
        Object.entries(addressInfo.assets).forEach(([key, value]) => {
          addressBalances.push({
            id: key,
            balance: value.balance,
            name: assets.get(key)?.name || 'UNKNOWN',
            symbol: assets.get(key)?.symbol || 'UNKNOWN',
          });
        });
        return addressBalances;
      }
      return [];
    },
  },
});
