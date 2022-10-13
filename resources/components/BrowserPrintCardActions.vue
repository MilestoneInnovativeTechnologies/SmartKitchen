<template>
  <q-card-actions class="bg-grey-1" v-if="browser_print && (Kitchens.length || Bill)">
    <q-chip clickable :label="kitchen.name" icon-right="receipt_long" color="primary" outline square v-for="kitchen in Kitchens" :key="'BPCA-K-'+kitchen.id" @click="printKOT(kitchen)" />
    <q-space />
    <q-chip clickable label="Bill" icon-right="print" color="primary" outline square v-if="Bill" @click="printBill" />
  </q-card-actions>
</template>

<script>
import BrowserPrint from "assets/mixins/BrowserPrint";

export default {
  name: "BrowserPrintCardActions",
  props: ['token','bill'],
  mixins: [BrowserPrint],
  computed: {
    Token(){ return this.token ? this.tokenToToken(this.token) : this.billToToken(this.bill) },
    Bill(){ return this.bill ? this.billToBill(this.bill) : this.tokenToBill(this.token) },
    Kitchens(){ return _(this.Token.items).map('kitchen').filter().uniqBy('id').value() }
  },
  methods: {
    printBill(){ this.BrowserPrint('bill',this.Bill.id) },
    printKOT({ id }){ this.BrowserPrint('kitchen',id,this.Token.id) },
  }
}
</script>
