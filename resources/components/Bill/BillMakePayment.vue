<template>
  <q-card>
    <q-bar class="bg-positive text-white q-py-lg">
      <q-list class="q-my-xl full-width">
        <q-item style="font-size: 0.75rem" class="q-px-none items-center">
          <q-item-section side class="text-white">{{ bill.id }} ({{ token.id }})</q-item-section>
          <q-item-section side class="text-white" style="font-size: 0.70rem">{{ date(token.date) }}</q-item-section>
          <q-item-section class="text-white">{{ token.type }}</q-item-section>
          <q-item-section side class="text-white">{{ token.customer.name }}</q-item-section>
<!--          <q-item-section side><q-btn icon="close" color="white" rounded flat dense v-close-popup class="q-mt-xs" /></q-item-section>-->
        </q-item>
      </q-list>
    </q-bar>
    <q-list separator style="font-size: 0.75rem" bordered>
      <q-item v-for="(item,idx) in token.items" :key="'tgb-t-'+token.id+'-ti-'+item.id+'-idx-'+idx">
        <q-item-section>
          <q-item-label caption>{{ item.quantity }}x {{ precision(item.price) }}</q-item-label>
          <q-item-label>{{ item.item.name }}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-bold">{{ precision(item.price * item.quantity) }}</q-item-section>
      </q-item>
    </q-list>
    <q-card-section horizontal class="text-caption">
      <q-card-section class="col">
        <div class="flex justify-between"><span>Items </span><span>{{ token.items? token.items.length : 0 }}</span></div>
        <div class="flex justify-between"><span>Quantities </span><span>{{ quantities }}</span></div>
        <div class="flex justify-between"><span>Tax Type </span><span>{{ bill.nature || '-' }}</span></div>
      </q-card-section>
      <q-card-section class="col">
        <div class="flex justify-between"><span>Total </span><span>{{ precision(total) }}</span></div>
        <div class="flex justify-between"><span>Discount </span><span>{{ precision(bill.discount) }}</span></div>
        <div class="flex justify-between"><span>Paid </span><span>{{ precision(bill.paid) }}</span></div>
      </q-card-section>
    </q-card-section><q-separator />
    <q-item-section class="text-center q-py-md">
      <q-item-label style="font-size: 1.5rem; line-height: 1rem !important;" class="text-weight-bolder">{{ precision(to_pay) }}</q-item-label>
      <q-item-label caption class="text-capitalize">Payable</q-item-label>
    </q-item-section>
    <q-list class="bg-grey-2" bordered >
      <q-item>
        <q-item-section><q-select outlined v-model="type" :options="options" label="Type" /></q-item-section>
        <q-item-section><q-input outlined type="number" v-model.number="amount" label="Amount" @keyup="amount_percent" /></q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="right" class="q-px-lg">
      <q-btn label="Add Payment" color="positive" class="q-px-md" @click="pay" :disabled="amount === 0" />
    </q-card-actions>
    <q-inner-loading :showing="loading"><q-spinner-facebook color="positive" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>

import {human_date2, is_period, is_today, precision, time} from "assets/helpers";
import UserSelectDropDown from "components/Users/UserSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";
import ChefLayout from "layouts/ChefLayout";
import {PaymentsTypes} from "assets/assets";

export default {
  name: "BillMakePayment",
  components: {ChefLayout, TaxNatureSelectDropDown, OrderCustomer, UserSelectDropDown},
  props: ['bill'],
  data(){ return {
    loading: false, discount: 0, tax: null,
    options: PaymentsTypes, type: PaymentsTypes[0],
    v_amount: 0
  } },
  computed: {
    token(){ return _.get(this.bill,'token') },
    total(){ return _.sumBy(this.token.items,({ price,quantity }) => price*quantity) },
    quantities(){ return _.sumBy(this.token.items,({ quantity }) => quantity) },
    to_pay(){ return _.subtract(this.bill.payable,this.bill.paid) },
    customer: {
      get(){ return _.get(this.token,['customer','id']) },
      set(customer){ this.loading = true; post('token','customer',{ token:this.token.id,customer }).then(() => this.loading = false) }
    },
    amount: {
      get(){ return this.v_amount || this.to_pay },
      set(v){ this.v_amount = _.toNumber(v) },
    },
  },
  methods: {
    precision,
    date(date){ return is_today(date) ? time(date) : human_date2(date) },
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
      let params = { bill:this.bill.id, amount:this.amount, type:this.type }
      post('payment','create',params).then(() => this.v_amount = 0).catch().then(() => this.loading = false)
    },
  },
}
</script>
