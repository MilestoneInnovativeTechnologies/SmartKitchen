<template>
  <q-card v-if="Tokens.length">
    <q-card-section class="bg-deep-purple text-white row justify-between text-bold"><div>Home Delivery Statuses</div><div>{{ Tokens.length }}</div></q-card-section>
    <OrderSummaryDeliveryBoy :tokens="Tokens" kitchen user />
  </q-card>
</template>

<script>
import Bills from "assets/mixins/Bills";
import OrderSummaryDeliveryBoy from "components/Order/OrderSummaryDeliveryBoy";
import {image} from "assets/helpers";
import {NoCustomer} from "assets/assets";

export default {
  name: "ReceptionistHomeDeliveryStatuses",
  mixins: [Bills],
  components: { OrderSummaryDeliveryBoy },
  computed: {
    Tokens(){ return _(this.tokens).filter(['type','Home Delivery']).filter(({ progress }) => !['Paid','Cancelled'].includes(progress)).map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer })).value() },
    token_ids(){ return _.map(this.Tokens,'id') },
    Bills(){ return _(this.bills).filter(bill => _.includes(this.token_ids,bill.token.id)).keyBy('token.id').value() }
  },
  methods: {
    image,
  }
}
</script>
