<template>
  <q-page padding>
    <div class="text-center q-py-md q-my-md cursor-pointer" @click="() => (mode++ && (page = 1))">
      <div class="text-caption" style="line-height: 0.75rem">Total {{ idx }} Payments</div>
      <div class="text-bold text-positive text-h3">{{ precision(Totals[idx]) }}</div>
    </div>
    <q-list separator>
      <q-item v-for="payment in Showing" :key="'dbp-' + payment.id">
        <q-item-section avatar><q-avatar rounded><q-img :src="image(payment.customer.image)" /></q-avatar></q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">{{ payment.token }}, {{ payment.customer.name }}</q-item-label>
          <q-item-label caption lines="1">{{ payment.bill }} - {{ payment.items }}</q-item-label>
          <q-item-label caption class="text-positive">{{ payment.type }} Payment</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-bold text-positive">{{ precision(payment.amount) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn class="full-width q-mt-md" label="Load More" flat dense color="amber" @click="page++" v-show="Payments[idx].length > Showing.length" />
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import {image, is_today, precision} from "assets/helpers";
import {PaymentsTypes} from "assets/assets";

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
    Showing(){ return _.take(this.Payments[this.idx],this.page * 10) }
  },
  methods: {
    image, precision
  }
}
function items_name(items){ return _.map(items, item => _.get(item,['item','name'])).join(", ") }
</script>
