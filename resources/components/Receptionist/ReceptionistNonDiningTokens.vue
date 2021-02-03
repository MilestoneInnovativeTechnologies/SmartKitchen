<template>
  <q-card>
    <q-card-section class="bg-grey-2 row justify-between text-bold"><div>Non Dining Orders</div><div v-if="oTokens.length">{{ oTokens.length }}</div></q-card-section>
    <q-card-section class="q-pa-xs">
    <div class="row q-col-gutter-xs">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1" v-for="token in oTokens" :key="hKey(token)">
        <OrderSummaryReceptionistOrder :id="token.id" />
      </div>
    </div>
    </q-card-section>
  </q-card>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {h_key} from "assets/helpers";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";

export default {
  name: "ReceptionistNonDiningTokens",
  components: {OrderSummaryReceptionistOrder},
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
