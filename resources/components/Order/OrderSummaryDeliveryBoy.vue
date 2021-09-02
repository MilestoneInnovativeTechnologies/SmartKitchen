<template>
  <q-list v-bind="$attrs">
    <div v-if="payment !== undefined" class="text-h4 text-center text-bold text-primary q-mb-md"><span class="text-caption" style="line-height: 0.55rem">Total Payments</span><br />{{ precision(total) }}</div>
    <q-item v-for="(token,idx) in tokens" :key="'osdb-tk-'+token.id+'-idx-'+idx">
      <q-item-section avatar><q-avatar rounded><q-img :src="image(token.customer.image)" /></q-avatar></q-item-section>
      <q-item-section>
        <q-item-label>{{ token.customer.name }}</q-item-label>
        <q-item-label caption lines="2" v-if="kitchen === undefined">{{ token.items.map(item => item.item.name).join(', ') }}</q-item-label>
        <q-item-label caption lines="1" v-else v-for="(item,idx2) in token.items" :key="'osdb-tk-'+token.id+'-idx-'+idx+'ims-'+item.id+'-'+idx2" v-html="kitchen_view(item)" />
        <template v-if="address !== undefined && token.customer">
          <q-item-label caption lines="2">{{ token.customer.phone }}</q-item-label>
          <q-item-label caption lines="2">{{ token.customer.address }}</q-item-label>
        </template>
        <q-item-label caption v-if="payment !== undefined && token_payment(token)">{{ time(payment_date(token)) }}</q-item-label>
        <template v-if="user !== undefined">
          <q-item-label caption v-if="token_user(token)">User: {{ token_user(token) }}</q-item-label>
          <q-item-label caption>Amount: {{ precision(token_total(token)) }}</q-item-label>
        </template>
      </q-item-section>
      <q-item-section side v-if="user === undefined">{{ precision(token_total(token)) }}</q-item-section>
      <q-item-section side v-else class="text-purple text-caption">
        <q-item-label class="text-bold">{{ token_status(token) }}
          <q-btn v-if="token_status(token) === 'Billable'" dense icon="reply_all" flat size="sm" class="flip-horizontal q-mb-xs" @click="$emit('generate',token)" />
          <q-btn v-if="token_status(token) === 'Deliverable'" dense icon="reply_all" flat size="sm" class="flip-horizontal q-mb-xs" @click="$emit('deliver',token)" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import {image,precision,time} from "assets/helpers";

export default {
  name: "OrderSummaryDeliveryBoy",
  props: ['tokens','kitchen','address','payment','user'],
  computed: {
    Bills(){ return this.payment === undefined ? [] : _(this.$store.state.bills.data).filter(bill => _.includes(_.map(this.tokens,'id'),bill.token)).keyBy('token').value() },
    Payments(){ return this.payment === undefined ? [] : _(this.$store.state.payments.data).filter(payment => _.includes(_.map(this.Bills,'id'),payment.bill)).groupBy('bill').value() },
    total(){ return _(this.Bills).map(({ id }) => this.bill_paid(this.Payments[id])).sum() }
  },
  methods: {
    image, precision, time,
    kitchen_view(item){ return `${item.quantity}x ${item.item.name}: <span class="text-deep-purple">${item.progress}</span>`+(item.kitchen ? ` (${item.kitchen.name})` : '') },
    bill_paid(payments){ return _.sumBy(payments,({ amount }) => _.toNumber(amount)) },
    token_payment({ id }){ return _.get(this.Payments,_.get(this.Bills,[id,'id'])) },
    payment_date(token){ return _.get(_.last(this.token_payment(token)),'date') },
    token_user({ id,user,waiter }) {
      let bill = _.find(this.$store.state.bills.data, {token: id});
      return (bill && bill.user)
        ? _.get(this.$store.state.users.data[parseInt(bill.user)], 'name')
        : (user ? waiter.name : '')
    },
    token_total(token){
      return this.payment === undefined
        ? token.items.reduce((sum,item) => sum + item.quantity * item.price,0)
        : (this.token_payment(token) ? this.bill_paid(this.Payments[this.Bills[token.id]['id']]) : 0)
    },
    token_status({ id,progress,items }){
      let bill = _.find(this.$store.state.bills.data, {token: id});
      if(bill) return bill.progress === 'Pending' ? 'Deliverable' : (bill.progress === 'Partial' ? 'Partially Paid' : 'Paid');
      if(['New','Accepted'].includes(progress)) return 'New';
      return is_all_completed(items) ? 'Billable' : 'Processing';
    }
  }
}
function is_all_completed(items){
  return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed'],progress))
}
</script>
