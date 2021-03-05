<template>
  <q-card>
    <q-card-section class="bg-grey-2 row justify-between text-bold"><div>Non Dining Orders</div><div v-if="oTokens.length">{{ oTokens.length }}</div></q-card-section>
    <q-card-section class="q-pa-xs">
      <Masonry :items="oTokens">
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
  name: "ReceptionistNonDiningTokens",
  components: {Masonry, OrderSummaryReceptionistOrder},
  mixins: [Tokens],
  data(){ return {
    activeProgress: ['New','Processing','Completed','Billed','Pending']
  } },
  computed: {
    oTokens(){ return _(this.tokens).filter(({ type,progress }) => type !== 'Dining' && this.activeProgress.includes(progress)).value() }
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','non','dining','token',id) },
  }
}
</script>
