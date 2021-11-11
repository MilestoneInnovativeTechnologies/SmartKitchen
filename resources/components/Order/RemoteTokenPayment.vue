<template>
  <q-card>
    <q-card-section horizontal>
      <q-card-section class="col">
        <div class="flex justify-between items-center text-caption"><div>Bill Amount</div><div>{{ precision(amount) }}</div></div>
        <div class="flex justify-between items-center text-caption"><div>Discount</div><div>{{ precision(discount) }}</div></div>
        <div class="flex justify-between items-center text-caption text-bold text-primary"><div>Payable</div><div>{{ precision(payable) }}</div></div>
      </q-card-section>
      <q-card-section class="col">
        <div class="flex justify-between items-center text-caption text-positive text-bold"><div>Total Paid</div><div>{{ precision(paid) }}</div></div>
        <div class="flex justify-between items-center text-positive text-bold"><div>Balance</div><div>{{ precision(balance) }}</div></div>
        <div class="flex justify-between items-center text-caption text-secondary"><div>Status</div><div>{{ bill.progress }}</div></div>
      </q-card-section>
    </q-card-section>
    <q-list class="bg-grey-1" bordered v-show="bill.progress !== 'Paid'">
      <q-item>
        <q-item-section><q-select outlined v-model="type" :options="options" label="Type" dense /></q-item-section>
        <q-item-section><q-input outlined type="number" v-model.number="pay_amount" label="Amount" @keyup="amount_percent" dense /></q-item-section>
        <q-item-section><q-btn label="Add Payment" color="positive" class="q-px-md" @click="pay" :disabled="pay_amount <= 0" /></q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="loading"><q-spinner-facebook color="positive" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>
import {is_period, precision} from "assets/helpers";
import {PaymentsTypes} from "assets/assets";
import {mapState} from "vuex";

export default {
  name: "RemoteTokenPayment",
  props: ['bill'],
  data(){ return {
    options: PaymentsTypes, type: PaymentsTypes[0],
    loading: false, pay_amount: 0
  } },
  computed: {
    ...mapState('payments',{ payments:state => _(state.data).filter({ status:'Active' }).groupBy('bill').value() }),
    amount(){ return _.get(this.bill,'amount') },
    discount(){ return _.get(this.bill,'discount') },
    payable(){ return _.subtract(this.amount,this.discount) },
    paid(){ return _.sumBy(_.get(this.payments,this.bill.id),({ amount }) => _.toNumber(amount)) },
    balance(){ return _.subtract(this.payable,this.paid) }
  },
  methods: {
    precision,
    amount_percent(e){
      if(is_period(e.keyCode) && (this.prv_per || _.includes(_.toString(this.amount),"."))) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.amount = this.bill.payable * this.amount * 0.01
            e.target.blur(); e.target.focus();
          })
        },250)
      }
      this.prv_per = is_period(e.keyCode);
    },
    pay(){
      this.loading = true; if(this.amount === 0) return alert('Enter paying amount..' + ((this.loading = false) || ''));
      let params = { bill:this.bill.id, amount:this.pay_amount, type:this.type }
      post('payment','create',params).then(() => this.pay_amount = 0).catch().then(() => this.loading = false)
    },
  }
}
</script>
