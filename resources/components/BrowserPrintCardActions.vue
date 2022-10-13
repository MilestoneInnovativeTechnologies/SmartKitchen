<template>
  <q-card-actions class="bg-grey-1" v-if="browser_print && (Kitchens.length || Bill)">
    <q-chip clickable :label="kitchen.name" icon-right="receipt_long" color="primary" outline square v-for="kitchen in Kitchens" :key="'BPCA-K-'+kitchen.id" @click="printKOT(kitchen)" />
    <q-space />
    <q-chip clickable label="Bill" icon-right="print" color="primary" outline square v-if="Bill" @click="printBill" />
  </q-card-actions>
</template>

<script>
import {settings_boolean} from "assets/helpers";
import bills from "assets/mixins/Bills";

const BPPath = [location.protocol+'/',location.host,'browser_print'].join('/');

export default {
  name: "BrowserPrintCardActions",
  props: ['token','bill'],
  mixins: [bills],
  computed: {
    browser_print(){ return settings_boolean(settings('browser_print')) === true },
    Token(){ return this.token ? this.tokenToToken(this.token) : this.billToToken(this.bill) },
    Bill(){ return this.bill ? this.billToBill(this.bill) : this.tokenToBill(this.token) },
    Kitchens(){ return _(this.Token.items).map('kitchen').filter().uniqBy('id').value() }
  },
  methods: {
    tokenToToken(tkn){
      if(_.isObject(tkn)) return tkn;
      return _.find(this.tokens,['id',_.toNumber(tkn)])
    },
    billToToken(bill){
      if(_.isObject(bill)) return this.tokenToToken(bill.token);
      return _.get(_.find(this.bills,['id',_.toNumber(bill)]),'token',null)
    },
    billToBill(bill){
      if(_.isObject(bill)) return bill;
      return _.find(this.bills,['id',_.toNumber(bill)])
    },
    tokenToBill(tkn){
      if(_.isObject(tkn)) return _.get(this.token_bill,_.toNumber(tkn.id))
      return _.get(this.token_bill,_.toNumber(tkn),null)
    },

    url(args){ return BPPath + '?' + _.map(args,(v,k) => `${k}=${v}`).join('&') },

    printBill(){ let win = window.open(this.url({ page:'bill',id:this.Bill.id }),'_blank'); setTimeout(win => win.close(),1500,win) },
    printKOT({ id }){ let win = window.open(this.url({ page:'kitchen',id,token:this.Token.id }),'_blank'); setTimeout(win => win.close(),1500,win) }
  }
}
</script>
