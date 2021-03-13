<template>
  <q-card>
    <q-card-section class="q-pa-xs" :class="bgCls"></q-card-section>
    <q-list dense>
      <q-item dense v-for="(key,label) in header" :key="hKey('header',key)">
        <q-item-section>{{  label }}</q-item-section>
        <q-item-section side>{{ attrs(key) }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>Customer</q-item-section>
        <q-item-section side>{{ attrs('customer.name') }}</q-item-section>
      </q-item>
    </q-list>
    <q-list bordered>
      <q-item v-for="content in contents" :key="hKey('content',content.id)">
        <q-item-section>
          <q-item-label>{{ content.name }}</q-item-label>
          <q-item-label caption>{{ content.quantity }} x {{ precision(content.price) }}</q-item-label>
          <q-item-section v-if="content.tax">
            <q-item-label caption>
              {{ content.tax.name }} {{ precision(content.tax.amount) }} @{{ content.tax.percent }}%
            </q-item-label>
            <q-item-label caption v-for="tax in content.tax.contents" :key="hKey('tax',Math.random())">
              - {{ tax.name }} {{ precision(tax.amount) }} @{{ tax.percent }}%
            </q-item-label>
          </q-item-section>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ precision(getTotal(content)) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list dense bordered>
      <q-item dense>
        <q-item-section>Sub Total</q-item-section>
        <q-item-section side class="text-bold">{{ precision(total) }}</q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section>Discount</q-item-section>
        <q-item-section side class="text-bold">{{ precision(discount) }}</q-item-section>
      </q-item>
      <q-item dense style="font-size: 1rem">
        <q-item-section>Net Payable</q-item-section>
        <q-item-section side class="text-bold">{{ precision(attrs('payable')) }}</q-item-section>
      </q-item>
      <q-item v-if="paid > 0" dense style="font-size: 1rem">
        <q-item-section>Total Paid</q-item-section>
        <q-item-section side class="text-bold">{{ precision(paid) }}</q-item-section>
      </q-item>
    </q-list>
    <q-card-actions vertical align="center" class="q-gutter-y-xs">
      <q-select outlined v-model="type" :options="options" label="Type" class="full-width" />
      <q-input outlined type="number" v-model.number="balance" label="Amount" class="full-width" />
      <q-btn label="Make Payment" class="full-width" color="primary" @click="pay" :loading="loading" />
    </q-card-actions>
    <q-inner-loading :showing="loading"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>
import {h_key, precision} from "assets/helpers";
import {DiningTypeColor, PaymentsTypes} from "assets/assets";

export default {
  name: "BillDetailCard",
  data(){ return {
    header:{ 'Bill ID':'id','Token':'token.id','Type':'token.type','Date':'date' },
    v_amount: 0, loading: false,
    options: PaymentsTypes, type: PaymentsTypes[0]
  } },
  computed: {
    bgCls(){ return 'bg-' + DiningTypeColor[this.attrs('token.type')] },
    contents(){ return this.attrs('contents',[]) },
    total(){ return _.sum(_.map(this.contents,this.getTotal)) },
    discount(){ return _.sum(_.map(this.contents,({ discount }) => _.toNumber(discount))) },
    paid(){ return _.toNumber(this.attrs('paid',0)) },
    balance:{
      get(){ return this.v_amount || (this.total - this.discount - this.paid) },
      set(amt){ this.v_amount = _.toNumber(amt) }
    },
  },
  methods: {
    hKey(item,key){ return h_key('bill',this.attrs('id'),'details',item,key) },
    attrs(key,def){ return _.get(this.$attrs,key,def) },
    precision(n){ return precision(n) },
    getTotal({ price,quantity }){ return _.toNumber(price) * _.toNumber(quantity) },
    pay(){
      this.loading = true; if(!this.attrs('id') || !this.balance) return this.loading = false;
      let params = { bill:this.attrs('id'), amount:this.balance, type:this.type }
      post('payment','create',params).then().catch().then(() => this.loading = false)
    }
  }/*,
  created() {
    this.amount = _.toNumber(this.balance)
  }*/
}
</script>
