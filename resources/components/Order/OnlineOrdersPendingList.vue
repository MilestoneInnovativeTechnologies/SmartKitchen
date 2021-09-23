<template>
  <q-card v-if="enabled && orders.length" v-bind="$attrs">
    <q-card-section v-if="title" class="row justify-between text-bold text-white" :class="'bg-' + clr"><div>{{ title }}</div></q-card-section>
    <q-list separator>
      <q-item v-for="(order,idx) in orders" :key="'ono-rd-or-' + order.id">
        <q-item-section v-if="order.type"><q-item-label>{{ order.type }}</q-item-label><q-item-label caption>{{ t2DateTime(order) }}</q-item-label></q-item-section>
        <q-item-section v-if="order.price_list"><q-item-label>{{ pl_name(order) }}</q-item-label><q-item-label caption>Price List</q-item-label></q-item-section>
        <q-item-section v-if="order.seating"><q-item-label>{{ st_name(order) }}</q-item-label><q-item-label caption>Seating</q-item-label></q-item-section>
        <q-item-section v-if="order.customer"><q-item-label>{{ ct_name(order) }}</q-item-label><q-item-label caption>Customer</q-item-label></q-item-section>
        <q-item-section side><q-item-label class="text-bold text-subtitle1" :class="'text-' + clr">{{ precision(it_total(order)) }}</q-item-label></q-item-section>
        <q-item-section side><q-btn icon="reply" class="flip-horizontal" flat dense :color="clr" @click="confirm_order(idx)" /></q-item-section>
      </q-item>
    </q-list>
    <q-dialog persistent v-model="confirm_pop"><OnlineOrderConfirmCard :color="clr" :style="popup_width" v-bind="orders[confirm_idx]" @confirmed="confirm_pop = false" /></q-dialog>
  </q-card>
</template>

<script>
import {now, popup_width, precision, to_format} from "assets/helpers";
import OnlineOrderConfirmCard from "components/Order/OnlineOrderConfirmCard";
import OnlineOrders from "assets/mixins/OnlineOrders";
const { GH75F,JI36A } = require('boot/subscription').FEATURES

export default {
  name: "OnlineOrdersPendingList",
  components: {OnlineOrderConfirmCard},
  props: ['title','color','only'],
  mixins: [OnlineOrders],
  data(){ return {
    enabled: GH75F === 'Yes', local: !JI36A, reference: JI36A,
    confirm_pop: false, popup_width: popup_width(), confirm_idx: null,
  } },
  computed: {
    orders(){ return _.filter(this.$store.state.online.data,({ active,type,token }) => active && (!this.only || this.only === type) && !token) },
    clr(){ return this.color || 'purple' }
  },
  methods: {
    precision, hKey(){ return h_key('receptionist','online','order') },
    t2DateTime({ time }){ let diff = now()- time; return to_format((diff > (60*60*24)) ? 'hh:mm A (dddd)' : 'hh:mm A',_.toNumber(time) * 1000) },
    confirm_order(idx){ this.confirm_pop = true; this.confirm_idx = idx }
  }
}
</script>
