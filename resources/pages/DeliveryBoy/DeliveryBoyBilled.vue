<template>
  <q-page padding>
    <q-list>
<!--      <q-item-label header class="text-h6">Own</q-item-label>-->
<!--      <q-item-label caption v-if="!own.length" class="q-pl-lg">No Own Tokens</q-item-label>-->
      <TokenDetailDeliveryBoyExpansion v-for="token in deliverable" :key="'dbc-own-' + token.id" :token="token" @deliver="deliver(token)" @bill="bill(token)" group="own" color="positive" popup :label="token.customer.name" :caption="time(token.date)" />
<!--      <q-item-label header class="text-h6">Orphan</q-item-label>-->
<!--      <q-item-label caption v-if="!orphan.length" class="q-pl-lg">No Orphan Tokens</q-item-label>-->
<!--      <TokenDetailDeliveryBoyExpansion v-for="token in orphan" :key="'dbc-own-' + token.id" :token="token" @deliver="deliver(token)" @bill="bill(token)" group="orphan" color="accent" popup :label="token.customer.name" :caption="pa(token)" />-->
<!--      <q-item-label header class="text-h6">Other</q-item-label>-->
<!--      <q-item-label caption v-if="!other.length" class="q-pl-lg">No Others Tokens</q-item-label>-->
<!--      <TokenDetailDeliveryBoyExpansion v-for="token in other" :key="'dbc-own-' + token.id" :token="token" @deliver="deliver(token)" @bill="bill(token)" group="other" color="secondary" popup :label="np(token)" :caption="wa(token)" />-->
    </q-list>
    <q-dialog persistent v-model="bill_mode" @before-hide="bill_mode = false"><BillGenerateCard :token="selected" :style="popup_width()" v-if="selected" @generated="bill_mode = false" /></q-dialog>
    <q-dialog persistent v-model="deliver_mode" @before-hide="deliver_mode = false"><DeliveryBoyPaymentCard :token="selected" :style="popup_width()" v-if="selected" @paid="deliver_mode = false" /></q-dialog>
    <OrderNewFabDeliveryBoy />
  </q-page>
</template>

<script>
import TokenDetailDeliveryBoyExpansion from "components/Tokens/TokenDetailDeliveryBoyExpansion";
import {time, popup_width, settings_boolean} from "assets/helpers";
import BillGenerateCard from "components/Bill/BillGenerateCard";
import DeliveryBoyPaymentCard from "components/Payment/DeliveryBoyPaymentCard";
import {NoCustomer} from "assets/assets";
import OrderNewFabDeliveryBoy from "components/Order/OrderNewFabDeliveryBoy";
import Bills from "assets/mixins/Bills";

export default {
  name: "DeliveryBoyBilled",
  components: {OrderNewFabDeliveryBoy, DeliveryBoyPaymentCard, BillGenerateCard, TokenDetailDeliveryBoyExpansion},
  mixins: [Bills],
  data(){ return {
    me: parseInt(this.$route.meta.me.id),
    bill_mode: false, deliver_mode: false,
    selected: null,
  } },
  computed: {
    deliverable(){
      return _(this.bills)
        .filter(bill => ['Pending','Partial'].includes(bill.progress) && bill.token.type === 'Home Delivery')
        .filter(bill => this.hide_others ? can_view(bill,this.$route.meta.me.id) : true)
        .map('token')
        .value()
    },
    hide_others(){ return settings_boolean(settings('delivery_boy_hide_others_billed')) === true },
    hide_tokens(){ return this.hide_others ? _(this.bills).filter(bill => ['Pending','Partial'].includes(bill.progress)).filter(bill => do_hide(bill,this.me)).map(bill => _.toInteger(bill.token.id)).value() : [] },
    billed_tokens(){ return this.$store.getters['tokens/billed'] },
    Tokens(){
      return _(this.tokens)
        .filter(['type','Home Delivery'])
        .filter(is_all_completed)
        .map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer }))
        .filter(token => this.hide_others ? !_.includes(this.hide_tokens,token.id) : true)
        // .filter(token => !_.includes(this.billed_tokens,token.id))
        .value()
    },
    // own(){ return _.filter(this.Tokens,['user',this.me]) },
    // orphan(){ return _.filter(this.Tokens,({ user }) => _.isNull(user)) },
    // other(){ return _.filter(this.Tokens,({ user }) => !_.isNull(user) && user !== this.me) },
  },
  methods: {
    time, popup_width,
    np({ customer }){ return [customer.name,customer.phone].join(', ') },
    pa({ customer }){ return [customer.phone,customer.address].join('<br />') },
    wa({ waiter,customer }){ return [customer.address,'(User: '+waiter.name+')'].join('<br />') },
    bill({ id }){ this.selected = id; this.bill_mode = true },
    deliver({ id }){ this.selected = id; this.deliver_mode = true },
  }
}
function is_mine({ user },id){ return user && user.id === id }
function do_hide({ user },id){ return user && user.role === 'Delivery Boy' && user.id !== id }
function is_all_completed({ items }){
  return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed','Served'],progress))
}
function can_view({ user },id){ return !user || (user.id === id || user.role !== 'Delivery Boy') }
</script>
