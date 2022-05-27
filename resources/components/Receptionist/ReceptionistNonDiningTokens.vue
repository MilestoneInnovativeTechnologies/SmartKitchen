<template>
  <q-card v-if="oTokens.length">
    <q-card-section class="row justify-between text-bold text-white" :class="'bg-' + clr"><div>Non Dining Orders</div><div>{{ oTokens.length }}</div></q-card-section>
    <q-card-section class="q-pa-xs">
      <Masonry :items="oTokens" width="260">
        <template #item="token">
          <OrderSummaryReceptionistOrder :token="token" v-on="$listeners" />
        </template>
      </Masonry>
    </q-card-section>
  </q-card>
</template>

<script>
import {h_key} from "assets/helpers";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";
import Masonry from "components/Masonry";
import Bills from "assets/mixins/Bills";
import OrderSummaryActions from "assets/mixins/OrderSummaryActions";

export default {
  name: "ReceptionistNonDiningTokens",
  components: {Masonry, OrderSummaryReceptionistOrder},
  mixins: [Bills,OrderSummaryActions],
  props: ['color'],
  data(){ return {
    activeProgress: ['New','Processing','Completed','Billed','Pending'],
    displayTypes: ['Take Away','Sale','Other'],
  } },
  computed: {
    oTokens(){ return _(this.tokens).filter(({ type,progress }) => this.displayTypes.includes(type) && this.activeProgress.includes(progress)).map(token => Object.assign({},token,{ bill:this.token_bill[token.id] })).value() },
    clr(){ return this.color || 'teal' }
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','non','dining','token',id) },
  }
}
</script>
