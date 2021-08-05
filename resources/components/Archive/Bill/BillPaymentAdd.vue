<template>
  <q-card>
    <q-card-section class="row items-center q-pa-sm bg-grey-4">
      <q-icon name="account_balance" class="q-mr-sm" />
      <span>Add New Payment</span><q-space />
      <q-btn icon="close" size="sm" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="q-gutter-y-xs">
      <DateTime dense outlined v-model="date" />
      <q-select dense outlined v-model="type" :options="PaymentsTypes" label="Payment Type" />
      <q-input dense outlined type="number" v-model.number="amount" label="Amount" />
      <q-input dense outlined type="textarea" v-model="detail" label="Details" style="height: 5rem" />
    </q-card-section>
    <q-card-actions align="right" class="bg-grey-3">
      <q-btn :loading="loading" label="Save" color="primary" size="sm" @click="save" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {PaymentsTypes} from "assets/assets";
import DateTime from "components/DateTime";
import {to_format} from "assets/helpers";

export default {
  name: "BillPaymentAdd",
  components: {DateTime},
  props: ['bill'],
  data(){ return {
    loading: false, PaymentsTypes,
    date:'', amount:0, type:PaymentsTypes[0], detail:''
  } },
  created(){
    this.amount = _.toNumber(this.bill.payable) - _.toNumber(this.bill.paid);
    this.date = to_format('YYYY-MM-DD HH:mm:ss',new Date)
  },
  methods: {
    save(){ this.loading = true; post('payment','create',{ bill:this.bill.id,date:this.date,amount:this.amount,type:this.type,detail:this.detail }).then(this.saved) },
    saved(){ this.$emit('added'); this.loading = false }
  }
}
</script>
