<template>
  <q-card v-if="Tokens.length">
    <q-card-section class="bg-deep-purple text-white row justify-between text-bold"><div>Home Delivery Statuses</div><div>{{ Tokens.length }}</div></q-card-section>
    <OrderSummaryDeliveryBoy :tokens="Tokens" kitchen user @generate="generating = $event.id" @deliver="delivering = $event.id" />
    <q-dialog persistent :value="generating !== null" @hide="generating = null"><BillGenerateCard :style="popup_width()" v-if="generating" :token="generating" @generated="generating = null" /></q-dialog>
    <q-dialog persistent :value="delivering !== null" @hide="delivering = null"><DeliveryBoyPaymentCard :style="popup_width()" v-if="delivering" :token="delivering" @paid="delivering = null" /></q-dialog>
  </q-card>
</template>

<script>
import Bills from "assets/mixins/Bills";
import OrderSummaryDeliveryBoy from "components/Order/OrderSummaryDeliveryBoy";
import {image, popup_width} from "assets/helpers";
import {NoCustomer} from "assets/assets";
import BillGenerateCard from "components/Bill/BillGenerateCard";
import DeliveryBoyPaymentCard from "components/Payment/DeliveryBoyPaymentCard";

export default {
  name: "ReceptionistHomeDeliveryStatuses",
  mixins: [Bills],
  components: {DeliveryBoyPaymentCard, BillGenerateCard, OrderSummaryDeliveryBoy },
  data(){ return {
    generating: null, delivering: null,
  } },
  computed: {
    Tokens(){ return _(this.tokens).filter(['type','Home Delivery']).filter(({ progress }) => !['Paid','Cancelled'].includes(progress)).map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer })).value() },
    token_ids(){ return _.map(this.Tokens,'id') },
    Bills(){ return _(this.bills).filter(bill => _.includes(this.token_ids,bill.token.id)).keyBy('token.id').value() }
  },
  methods: {
    image, popup_width
  }
}
</script>
