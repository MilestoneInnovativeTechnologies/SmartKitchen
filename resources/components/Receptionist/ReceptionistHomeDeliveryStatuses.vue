<template>
  <q-card>
    <q-card-section class="bg-deep-purple text-white row justify-between text-bold"><div>Home Delivery Statuses</div><div v-if="Tokens.length">{{ Tokens.length }}</div></q-card-section>
    <OrderSummaryDeliveryBoy :tokens="Tokens" kitchen user />
<!--    <q-list>
      <q-item v-for="token in Tokens" :key="'rhd-s-t-' + token.id">
        <q-item-section avatar><q-avatar rounded><q-img :src="image(token.customer.image)" /></q-avatar></q-item-section>
        <q-item-section>
          <q-item-label>{{ token.customer.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>-->
  </q-card>
</template>

<script>
import Bills from "assets/mixins/Bills";
import OrderSummaryDeliveryBoy from "components/Order/OrderSummaryDeliveryBoy";
import {image} from "assets/helpers";

export default {
  name: "ReceptionistHomeDeliveryStatuses",
  mixins: [Bills],
  components: { OrderSummaryDeliveryBoy },
  computed: {
    Tokens(){ return _(this.tokens).filter(['type','Home Delivery']).filter(({ progress }) => !['Paid','Cancelled'].includes(progress)).value() },
    token_ids(){ return _.map(this.Tokens,'id') },
    Bills(){ return _(this.bills).filter(bill => _.includes(this.token_ids,bill.token.id)).keyBy('token.id').value() }
  },
  methods: {
    image,
  }
}
</script>
