<template>
  <q-page>
    <q-card square  class="q-mt-smq">
      <q-card-section class="text-center q-py-xs text-white" :class="'bg-' + clr" style="font-size: 0.75rem">Total <span class="text-bold">{{ idx }}</span> Payments</q-card-section>
      <q-card-section class="text-center text-bold text-h2 cursor-pointer" @click.native="next" :class="'text-' + clr">{{ precision(Totals[idx] || 0) }}</q-card-section>
      <q-separator class="q-mb-sm" v-show="Showing.length" />
      <q-list separator>
        <q-item v-for="payment in Showing" :key="'dbp-' + payment.id">
          <q-item-section avatar><q-avatar rounded><q-img :src="image(payment.customer.image)" /></q-avatar></q-item-section>
          <q-item-section>
            <q-item-label class="text-bold">{{ payment.token }}, {{ payment.customer.name }}</q-item-label>
            <q-item-label caption lines="1">{{ payment.bill }} - {{ payment.items }}</q-item-label>
            <q-item-label caption :class="'text-' +clr">{{ payment.type }} Payment</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-bold" :class="'text-' + clr">{{ precision(payment.amount) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator v-show="more" />
      <q-card-actions v-show="more" class="q-px-none">
        <q-btn class="full-width" label="Load More" flat dense color="amber" @click="page++" />
      </q-card-actions>
      <q-card-section v-show="!more" class="q-py-xs" :class="'bg-' + clr"></q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import {image, is_today, precision} from "assets/helpers";
import {PaymentsTypes,PaymentsTypeColors} from "assets/assets";

export default {
  name: "DeliveryBoyPayments",
  mixins: [Bills],
  data(){ return {
    me: parseInt(this.$route.meta.me.id),
    mode: 0, page: 1,
  } },
  computed: {
    Bills(){ return _(this.bills).filter(({ date,progress,token:{ type } }) => type === 'Home Delivery' && ['Partial','Paid'].includes(progress) && is_today(date)).filter(['user.id', this.me]).value() },
    Payments(){ return _(this.Bills).flatMap(bill => _.map(bill.payments,payment => payment.status === 'Active' ? Object.assign({},payment,{ token:bill.token.id,customer:bill.customer,items:items_name(bill.token.items) }) : null)).sortBy('id').reverse().groupBy('type').value() },
    Totals(){ return _.mapValues(this.Payments,payments => _.sumBy(payments,payment => _.toNumber(payment.amount))) },
    idx(){ return PaymentsTypes[this.mode % PaymentsTypes.length] },
    Showing(){ return _.take(this.Payments[this.idx],this.page * 10) },
    more(){ return _.size(_.get(this.Payments,this.idx,[])) > this.Showing.length },
    clr(){ return PaymentsTypeColors[this.idx] },
  },
  methods: {
    image, precision,
    next(){ this.page = 1; this.mode++ }
  }
}
function items_name(items){ return _.map(items, item => _.get(item,['item','name'])).join(", ") }
</script>
