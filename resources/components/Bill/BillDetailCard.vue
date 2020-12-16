<template>
  <q-card>
    <q-card-section class="bg-amber-2 q-pa-xs"></q-card-section>
    <q-list dense>
      <q-item dense v-for="(key,label) in header" :key="hKey('header',key)">
        <q-item-section>{{  label }}</q-item-section>
        <q-item-section side>{{ attrs(key) }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>Customer</q-item-section>
        <q-item-section side>{{ customer(attrs('customer')) }}</q-item-section>
      </q-item>
    </q-list>
    <q-list bordered>
      <q-item v-for="content in attrs('contents')" :key="hKey('content',content.id)">
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
          <q-item-label>{{ precision(total(content)) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list dense bordered>
      <q-item dense>
        <q-item-section>Sub Total</q-item-section>
        <q-item-section side class="text-bold">{{ precision(contents_total(attrs('contents'))) }}</q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section>Discount</q-item-section>
        <q-item-section side class="text-bold">{{ precision(contents_discount(attrs('contents'))) }}</q-item-section>
      </q-item>
      <q-item dense style="font-size: 1rem">
        <q-item-section>Net Payable</q-item-section>
        <q-item-section side class="text-bold">{{ precision(payable(attrs('contents'))) }}</q-item-section>
      </q-item>
    </q-list>
    <q-card-actions vertical align="center" class="q-gutter-y-xs">
      <q-input dense outlined type="number" v-model.number="amount" label="Amount" class="full-width" />
      <q-btn dense label="Make Payment" class="full-width" color="primary" @click="pay" :loading="loading" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {h_key, precision} from "assets/helpers";

export default {
  name: "BillDetailCard",
  data(){ return {
    header:{ 'Bill ID':'id','Token':'token','Date':'date' },
    amount: 0, loading: false,
  } },
  methods: {
    hKey(item,key){ return h_key('bill',this.attrs('id'),'details',item,key) },
    attrs(key){ return _.get(this.$attrs,key) },
    customer(id){ return _.get(this.$store.state.customers.data,[_.toInteger(id),'name']) },
    precision(n){ return precision(n) },
    total({ price,quantity }){ return _.toNumber(price) * _.toNumber(quantity) },
    contents_total(contents){ return _.sum(_.map(contents,this.total)) },
    contents_discount(contents){ return _.sum(_.map(contents,({ discount }) => _.toNumber(discount))) },
    payable(contents){ return this.contents_total(contents) - this.contents_discount(contents) },
    pay(){
      this.loading = true; if(!this.attrs('id') || !this.amount) return this.loading = false;
      let params = { bill:this.attrs('id'), amount:this.amount }
      post('payment','create',params).then().catch().then(() => this.loading = false)
    }
  },
  created() {
    this.amount = _.toNumber(this.payable(this.attrs('contents')))
  }
}
</script>
