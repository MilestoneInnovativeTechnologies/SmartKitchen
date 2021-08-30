<template>
  <q-card v-if="oTokens.length">
    <q-card-section class="bg-grey-2 row justify-between text-bold"><div>Non Dining Orders</div><div>{{ oTokens.length }}</div></q-card-section>
    <q-card-section class="q-pa-xs">
      <Masonry :items="oTokens" width="260">
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
    activeProgress: ['New','Processing','Completed','Billed','Pending'],
    displayTypes: ['Take Away','Home Delivery','Sale','Other'],
  } },
  computed: {
    oTokens(){ return _(this.tokens).filter(({ type,progress }) => this.displayTypes.includes(type) && this.activeProgress.includes(progress)).value() }
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','non','dining','token',id) },
  }
}
</script>
