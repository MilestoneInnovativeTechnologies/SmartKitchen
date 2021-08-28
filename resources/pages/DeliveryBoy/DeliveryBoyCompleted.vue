<template>
  <q-page padding>
    <q-list>
      <q-item-label header class="text-h6">Own</q-item-label>
      <q-item-label caption v-if="!own.length" class="q-pl-lg">No Own Tokens</q-item-label>
      <TokenDetailDeliveryBoyExpansion v-for="token in own" :key="'dbc-own-' + token.id" :token="token" @deliver="deliver(token)" @bill="bill(token)" group="own" color="positive" popup :label="token.customer.name" :caption="time(token.date)" />
      <q-item-label header class="text-h6">Orphan</q-item-label>
      <q-item-label caption v-if="!orphan.length" class="q-pl-lg">No Orphan Tokens</q-item-label>
      <TokenDetailDeliveryBoyExpansion v-for="token in orphan" :key="'dbc-own-' + token.id" :token="token" @deliver="deliver(token)" @bill="bill(token)" group="orphan" color="accent" popup :label="token.customer.name" :caption="pa(token)" />
      <q-item-label header class="text-h6">Other</q-item-label>
      <q-item-label caption v-if="!other.length" class="q-pl-lg">No Others Tokens</q-item-label>
      <TokenDetailDeliveryBoyExpansion v-for="token in other" :key="'dbc-own-' + token.id" :token="token" @deliver="deliver(token)" @bill="bill(token)" group="other" color="secondary" popup :label="np(token)" :caption="wa(token)" />
    </q-list>
    <q-dialog persistent v-model="bill_mode" @before-hide="bill_mode = false"><BillGenerateCard :token="selected" style="width:360px; max-width: 90vw;" v-if="selected" @generated="bill_mode = false" /></q-dialog>
    <q-dialog persistent v-model="deliver_mode" @before-hide="deliver_mode = false"><DeliveryBoyPaymentCard :token="selected" style="width:360px; max-width: 90vw;" v-if="selected" @paid="deliver_mode = false" /></q-dialog>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab || !Tokens.length" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'delivery_boy_order_new' }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import TokenDetailDeliveryBoyExpansion from "components/Tokens/TokenDetailDeliveryBoyExpansion";
import {time} from "assets/helpers";
import BillGenerateCard from "components/Bill/BillGenerateCard";
import DeliveryBoyPaymentCard from "components/Payment/DeliveryBoyPaymentCard";
import {NoCustomer} from "assets/assets";

export default {
  name: "DeliveryBoyCompleted",
  components: {DeliveryBoyPaymentCard, BillGenerateCard, TokenDetailDeliveryBoyExpansion},
  mixins: [Tokens],
  data(){ return {
    me: parseInt(this.$route.meta.me.id),
    bill_mode: false, deliver_mode: false,
    selected: null,
    fab: true, offset: [24,24],
  } },
  computed: {
    Tokens(){ return _(this.tokens).filter(['type','Home Delivery']).filter(is_all_completed).map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer })).value() },
    own(){ return _.filter(this.Tokens,['user',this.me]) },
    orphan(){ return _.filter(this.Tokens,({ user }) => _.isNull(user)) },
    other(){ return _.filter(this.Tokens,({ user }) => !_.isNull(user) && user !== this.me) },
  },
  methods: {
    time,
    np({ customer }){ return [customer.name,customer.phone].join(', ') },
    pa({ customer }){ return [customer.phone,customer.address].join('<br />') },
    wa({ waiter,customer }){ return [customer.address,'(User: '+waiter.name+')'].join('<br />') },
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] },
    bill({ id }){ this.selected = id; this.bill_mode = true },
    deliver({ id }){ this.selected = id; this.deliver_mode = true },
  }
}

function is_all_completed({ items }){
  return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed'],progress))
}
</script>
