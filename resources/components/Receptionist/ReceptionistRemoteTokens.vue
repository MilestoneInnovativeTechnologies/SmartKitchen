<template>
  <q-card v-if="rTokens.length">
    <q-card-section class="bg-grey-2 row justify-between text-bold"><div>Remote Orders</div><div>{{ rTokens.length }}</div></q-card-section>
    <q-card-section class="q-pa-xs">
      <Masonry :items="rTokens" width="260">
        <template #item="token">
          <OrderSummaryReceptionistOrder :id="token.id" />
        </template>
      </Masonry>
    </q-card-section>
  </q-card>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {h_key} from "assets/helpers";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";
import Masonry from "components/Masonry";

export default {
  name: "ReceptionistRemoteTokens",
  components: {Masonry, OrderSummaryReceptionistOrder},
  mixins: [Tokens],
  data(){ return {

  } },
  computed: {
    rTokens(){ return _(this.tokens_remote).filter(({ items }) => _.some(items,({ progress }) => progress === 'Completed')).value() }
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','remote','token',id) },
  }
}
</script>
