<template>
  <q-card v-if="Tokens.length || filter">
    <q-card-section class="bg-deep-purple text-white row justify-between text-bold items-center q-py-xs"><div>Home Delivery Statuses</div><FilterInputText bg-color="white" class="gt-xs" style="width: 50vw" label="Filter" @text="filter = $event" lazy /><div>{{ Tokens.length }}</div></q-card-section>
    <q-card-section class="lt-sm"><FilterInputText label="Search" @text="filter = $event" lazy /></q-card-section>
    <OrderSummaryDeliveryBoy :tokens="show" kitchen user @generate="generating = $event" @deliver="deliver" />
    <q-dialog persistent :value="generating !== null" @hide="generating = null"><BillGenerateCard :style="popup_width()" v-if="generating" :token="generating" @generated="generating = null" :close="true" /></q-dialog>
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
import FilterInputText from "components/FilterInputText";

export default {
  name: "ReceptionistHomeDeliveryStatuses",
  mixins: [Bills],
  components: {FilterInputText, DeliveryBoyPaymentCard, BillGenerateCard, OrderSummaryDeliveryBoy },
  data(){ return {
    generating: null, delivering: null,
    filter: ''
  } },
  computed: {
    Tokens(){ return _(this.tokens)
      .filter(['type','Home Delivery'])
      .filter(({ progress }) => !['Paid','Cancelled'].includes(progress))
      .map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer }))
      .map(token => Object.assign({},token,{ slug:tokenSlug(token),bill:_.get(this.token_bill,token.id) }))
      .sortBy('id').reverse()
      .value()
    },
    show(){ return this.filter ? _.filter(this.Tokens,token => _.includes(token.slug,_.toLower(this.filter))) : _.take(this.Tokens,10) },
  },
  methods: {
    image, popup_width,
    deliver(token){ this.delivering = Object.assign({},token,{ bill:_.get(this.token_bill,token.id) }) }
  }
}
function tokenSlug(token){
  let customer = _.pick(_.get(token,'customer'),['name','phone']), items = _.map(_.get(token,'items'),'item.name'), waiter = _.get(token,['waiter','name'])
  return _.toLower(_.join(_.concat(token.id,items,_.values(customer),waiter)," "))
}
</script>
