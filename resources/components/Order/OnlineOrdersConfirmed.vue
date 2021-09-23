<template>
  <q-card>
    <q-card-section v-if="title" class="row justify-between text-bold text-white" :class="'bg-' + clr"><div>{{ title }}</div></q-card-section>
    <q-card-section v-show="!orders.length" class="text-center text-caption text-h6">NO ANY CONFIRMED ORDERS</q-card-section>
    <q-list v-show="orders.length" separator>
      <q-expansion-item v-for="(order,idx) in orders" :key="h_key('oo-cl-o',idx,'t',order.token)" :label="label(order)" :caption="caption(order)">
        <q-card>
          <q-list>
            <q-item v-for="item in order.items" :key="h_key('oo-cl-o',idx,'t',order.token,'i',item.item)">
              <q-item-section avatar class="col-shrink">&nbsp;</q-item-section>
              <q-item-section>
                <q-item-label>{{ item.quantity }}x {{ item.name }}</q-item-label>
                <q-item-label caption>Rate: {{ item.rate }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>{{ item.progress }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<script>
import {h_key, now, to_format} from "assets/helpers";

export default {
  name: "OnlineOrdersConfirmed",
  props: ['title','color','only'],
  computed: {
    clr(){ return this.color || 'purple' },
    orders(){ return _.filter(this.$store.state.online.data,({ active,type,token }) => active && (!this.only || this.only === type) && token) },
    pls(){ return this.$store.state.prices.list },
    seats(){ return this.$store.state.seating.data },
    customers(){ return this.$store.state.customers.data },
  },
  methods: {
    h_key,
    label({ type,seating,customer,token,progress  }){ return _.filter([token,type,(type === 'aDining' ? (_.get(this.seats,[seating,'name'])) : (type === 'Home Delivery' ? _.get(this.customers,[customer,'name']) : null)),progress]).join(' - ') },
    caption({ time,price_list }){ return `Time: ${this.t2DateTime({ time })} - Price List: ${_.get(this.pls,[price_list,'name'])}` },
    t2DateTime({ time }){ let diff = now()- time; return to_format((diff > (60*60*24)) ? 'hh:mm A (dddd)' : 'hh:mm A',_.toNumber(time) * 1000) },
  }
}
</script>
