<template>
  <q-page class="flex flex-center">
    <q-card class="full-width" flat v-if="ready">
      <q-card-section horizontal class="flex justify-between">
        <q-card-section class="flex flex-center" style="height: 100vh">
          <div class="flex q-gutter-xs">
            <Jumbotron :text="pBill.token.id + '/' + pBill.id" dark bordered style="width: 7rem; text-align: center; cursor:pointer" v-for="(pBill,idx) in unpaid" :key="'pending-bill-'+pBill.id" @click.native="selected = idx" />
          </div>
        </q-card-section>
        <q-card-section class="flex flex-center">
          <q-card :style="popup_width()" v-if="bill">
            <q-card-section class="q-py-sm flex justify-between text-white text-bold" :class="'bg-' + color"><span>Token: {{ bg('token','id') }}</span><span>Bill: {{ bg('id') }}</span></q-card-section>
            <q-card-section class="text-center">
              <QrcodeVue :value="url" :size="300" level="M" />
            </q-card-section>
            <q-card-section class="text-center bg-grey-2 text-center text-h4 text-bold">{{ precision(bg('payable')) }}</q-card-section>
            <q-card-section class="text-bold text-italic text-center text-caption q-py-sm">
              <div>{{ bg('customer','name') }} | {{ bg('token', 'type') }}</div>
              <div>{{ bg('token','date_human') }}</div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card-section>
    </q-card>
    <div v-else class="text-caption text-bold text-center">Please add <span class="text-italic">upi_address</span> and <span class="text-italic">upi_name</span> to settings</div>
  </q-page>
</template>

<script>

import Bills from "assets/mixins/Bills";
import QrcodeVue from 'qrcode.vue'
import {popup_width, precision} from "assets/helpers";
import Jumbotron from "components/Jumbotron";

export default {
  name: 'DisplayBillPayQRCode',
  mixins: [Bills],
  props: ['color'],
  components: {Jumbotron, QrcodeVue },
  data() {
    return {
      template: `upi://pay?pa=[address]&pn=[name]&am=[amount]&tn=[id]`,
      selected: 0,
      upi_address: settings('upi_address'), upi_name: settings('upi_name'),
    }
  },
  computed: {
    ready(){ return !!this.upi_address && !!this.upi_name },
    unpaid(){ return _(this.bills).filter(['progress','Pending']).value() },
    bill(){ return _.get(this.unpaid,this.selected,null) },
    upi(){ return new Object({ address:this.upi_address,name:this.upi_name,amount:_.get(this.bill,'payable'),id:_.get(this.bill,'id') }) },
    url(){ return encodeURI(this.template.replace(/\[\w*\]/g,key => _.get(this.upi,key.slice(1,-1)))) }
  },
  methods: {
    popup_width, precision,
    bg(...args){ return _.get(this.bill,args) },
  }
}
</script>
