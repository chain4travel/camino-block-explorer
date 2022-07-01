<template>
  <q-page-container
    class="column items-center justify-center no-wrap custum-container"
    style="gap: 50px"
  >
    <q-img
      src="/src/assets/comingSoon.svg"
      width="260px"
      height="280px"
      style="margin-top: 50px"
    />
    <div class="text-h5 text-center">
      The Camino Mainnet is not available yet.
    </div>
    <div>
      <q-btn
        @click="switchToClumbusNetwork"
        rounded
        no-caps
        class="text-subtitle1"
        color="primary"
        label="Switch to Columbus network"
      />
    </div>
  </q-page-container>
</template>

<script lang="ts">
import { useAppConfig } from 'src/stores/app-config';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'ComingSoon',
  setup() {
    const router = useRouter();
    const appConfig = useAppConfig();
    return {
      switchToClumbusNetwork() {
        appConfig.setActive('camino-testnet');
        router.push('/columbus');
      },
    };
  },
});
</script>
<style scoped lang="sass"></style>
