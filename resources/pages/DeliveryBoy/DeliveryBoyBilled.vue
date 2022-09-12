<template>
  <q-page padding>
    <div class="q-px-md q-mb-sm"><FilterInputText label="Filter" @text="filter = $event" lazy="true" /></div>
    <q-list>
      <TokenDetailDeliveryBoyExpansion v-for="token in FilteredTokens" :key="'dbc-bltk-' + token.id" :token="token" @action="OSA_action" group="own" color="positive" popup :label="label(token)" :caption="caption(token)" />
    </q-list>
    <q-btn class="full-width q-mt-md" label="Show more" flat dense color="amber" @click="page++" v-show="!filter && AllTokens.length > show" />
    <OrderSummaryActionPopups @done="OSA_action_done" v-bind="OSA_CB" />
    <OrderNewFabDeliveryBoy />
  </q-page>
</template>

<script>
import TokenDetailDeliveryBoyExpansion from "components/Tokens/TokenDetailDeliveryBoyExpansion";
import {time, popup_width, settings_boolean} from "assets/helpers";
import DeliveryBoyPaymentCard from "components/Payment/DeliveryBoyPaymentCard";
import OrderNewFabDeliveryBoy from "components/Order/OrderNewFabDeliveryBoy";
import Bills from "assets/mixins/Bills";
import FilterInputText from "components/FilterInputText";
import {ItemsPerPageDefault} from "assets/constants";
import OrderSummaryActionPopups from "components/Order/OrderSummaryActionPopups";
import OrderSummaryActions from "assets/mixins/OrderSummaryActions";

export default {
  name: "DeliveryBoyBilled",
  components: {OrderSummaryActionPopups, FilterInputText, OrderNewFabDeliveryBoy, DeliveryBoyPaymentCard, TokenDetailDeliveryBoyExpansion},
  mixins: [Bills,OrderSummaryActions],
  data(){ return {
    me: parseInt(this.$route.meta.me.id),
    filter: '', page: 1
  } },
  computed: {
    show(){ return this.page * _.ceil((settings('items_per_page') || ItemsPerPageDefault)/3) },
    hide_others(){ return settings_boolean(settings('delivery_boy_hide_others_billed')) === true },
    AllTokens(){
      return _(this.bills)
        .filter(bill => ['Pending','Partial'].includes(bill.progress) && bill.token.type === 'Home Delivery')
        .filter(bill => this.hide_others ? can_view(bill,this.$route.meta.me.id) : true)
        .sortBy('id').reverse()
        .map(bill => Object.assign({},bill.token,{ bill,slug:bill_slug(bill) }))
        .value()
    },
    FilteredTokens(){
      return this.filter ? _.filter(this.AllTokens,token => _.includes(token.slug,_.toLower(this.filter))) : _.take(this.AllTokens,this.show)
    }
  },
  methods: {
    popup_width,
    label(token){ return `${token.id}, ${token.customer.name}` },
    caption(token){ return ['Bill: ',token.bill.id,', Time:',time(token.date)].join(" ") },
    deliver(token){ this.selected = token; this.deliver_mode = true },
    paid(){ this.deliver_mode = false; this.selected = null },
  }
}
function can_view({ user },id){ return !user || (user.id === id || user.role !== 'Delivery Boy') }
function plain(txt){ return (txt || "").replace(/\n/g,", ") }
function bill_slug({ id,token,payable }){ return _.toLower([id,payable,token.id,token.customer.name,token.customer.phone,plain(token.customer.address)].join(" ")) }
</script>
