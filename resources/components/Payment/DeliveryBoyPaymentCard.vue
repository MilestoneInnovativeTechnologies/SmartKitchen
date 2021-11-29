<template>
  <q-card>
    <q-bar class="bg-accent text-white"><q-icon name="receipt_long" class="q-mr-md" />Delivery Payment<q-space /><q-btn icon="close" rounded flat dense v-close-popup /></q-bar>
    <q-card-section class="row q-col-gutter-sm">
      <q-input readonly outlined dense class="col-4" :value="Token.id" label="Token ID" />
      <q-input readonly outlined dense class="col-8" :value="Token.date_human" label="Token Date" />
      <q-input readonly outlined dense class="col-4" :value="Bill.id" label="Bill ID" />
      <q-input readonly outlined dense class="col-8" :value="human_date2(Bill.date)+' '+time(Bill.date)" label="Bill Date" />
    </q-card-section>
    <q-list dense separator>
      <q-item v-for="item in Token.items" :key="'db-gk-t-'+token+'-ti-'+item.id+'-i-'+item.id">
        <q-item-section avatar><q-avatar rounded><q-img :src="image(item.item.image)" /></q-avatar></q-item-section>
        <q-item-section>
          <q-item-label>{{ item.quantity }}x {{ item.item.name }}</q-item-label>
          <q-item-label caption>Rate: {{ item.price }}</q-item-label>
        </q-item-section>
        <q-item-section side>{{ precision(item.price * item.quantity) }}</q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="q-py-none bg-grey-2">
      <q-card-section class="row">
        <div class="col-2">&nbsp;</div>
        <div class="col-6 text-bold text-subtitle2">Sub Total</div>
        <div class="col-4 text-bold text-subtitle2 text-right">{{ precision(Bill.amount) }}</div>
        <div class="col-2">&nbsp;</div>
        <div class="col-6 text-bold text-subtitle2">Discount</div>
        <div class="col-4 text-bold text-subtitle2 text-right">{{ precision(Bill.discount) }}</div>
        <div class="col-2">&nbsp;</div>
        <div class="col-6 text-bold text-subtitle1">Payable</div>
        <div class="col-4 text-bold text-subtitle1 text-right">{{ precision(Bill.payable) }}</div>
      </q-card-section>
    </q-card-section>
    <q-card-actions class="row items-center q-col-gutter-x-sm">
      <q-select class="col" outlined v-model="type" :options="PaymentsTypes" label="Type" />
      <q-input class="col" v-model.number="amount" type="number" outlined label="Amount" />
      <div><q-btn color="positive" label="Pay" padding="md lg" @click="deliver" :loading="loading" /></div>
    </q-card-actions>
  </q-card>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import Bills from "assets/mixins/Bills";
import {image,precision,human_date2,time} from "assets/helpers";
import {PaymentsTypes} from "assets/assets";

export default {
  name: "DeliveryBoyPaymentCard",
  props: ['token'],
  mixins: [Tokens,Bills],
  data(){ return {
    loading: false, amount: 0, type: 'Cash',
    PaymentsTypes
  } },
  computed: {
    Token(){ return _.find(this.tokens,['id',parseInt(this.token)]) },
    Bill(){ return _.find(this.bills,bill => parseInt(_.get(bill,['token','id'])) === parseInt(this.token)) },
    total(){ return _.sumBy(this.Token.items,({ price,quantity }) => _.toNumber(price) * _.toNumber(quantity)) },
    token_item_ids(){ return _.map(this.Token.items,'id') },
  },
  methods: {
    human_date2, time, image, precision,
    deliver(){
      this.loading = true; if(!this.token || !this.amount || _.isEmpty(this.token_item_ids)) return this.loading = false;
      post('token','served',{ id:this.token_item_ids }).then().catch().then(this.pay)
    },
    pay(){
      let params = { bill:_.get(this.Bill,'id'), amount:this.amount, type:this.type }
      post('payment','create',params).then().catch().then(this.paid)
    },
    paid(){ this.loading = false; this.$emit('paid') }
  },
  watch: {
    Bill:{ immediate:true, deep:true, handler({ payable }){ this.amount = payable } }
  }
}
</script>
