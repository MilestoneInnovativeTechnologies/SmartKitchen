<template>
  <q-card>
    <q-card-section horizontal class="bg-teal-7 text-white">
      <q-card-section class="bg-teal">
        <div class="text-caption">{{ human_date2(bill.date,true) }}</div>
        <div class="text-h5 text-bold">{{ parseFloat(bill.payable).toFixed(2) }}</div>
        <div class="text-caption">Bill ID: {{ bill.id }}</div>
        <div class="text-caption" style="line-height: 0.45rem">Token ID: {{ bill.token.id }}</div>
      </q-card-section>
      <q-card-section>
        <q-badge color="grey-1" text-color="teal" :label="bill.token.type" class="q-mt-md q-px-lg q-py-sm" />
      </q-card-section>
      <q-card-section class="col-grow text-right">
        <q-btn icon="close" text-color="teal-1" dense rounded flat class="absolute-top-right q-mr-xs q-mt-xs" v-close-popup />
        <div class="q-mt-xl"></div>
        <div class="text-caption text-italic" style="font-size:0.70rem; line-height:0.70rem" v-show="bill.nature">{{ bill.nature }}</div>
        <div class="text-subtitle1" style="line-height:1.1rem">{{ bill.customer ? bill.customer.name : '' }}</div>
        <div class="text-subtitle2" style="font-size:0.8rem; line-height:1.1rem">{{ bill.customer ? bill.customer.phone : '' }}</div>
      </q-card-section>
    </q-card-section>
    <q-card-section class="row items-center justify-between q-pb-sm">
      <div class="text-center text-teal text-bold" style="line-height: 1">{{ parseFloat(bill.amount).toFixed(2) }}<br><span class="text-caption text-uppercase" style="font-size: 0.60rem">Amount</span></div>
      <div class="text-center text-teal text-bold" style="line-height: 1">{{ parseFloat(bill.discount).toFixed(2) }}<br><span class="text-caption text-uppercase" style="font-size: 0.60rem">Discount</span></div>
      <div class="text-center text-teal text-bold" style="line-height: 1">{{ parseFloat(bill.payable).toFixed(2) }}<br><span class="text-caption text-uppercase" style="font-size: 0.60rem">Payable</span></div>
    </q-card-section>
    <q-list bordered class="bg-grey-2">
      <template v-for="(content,idx) in bill.contents">
        <q-item :key="'ab-dv-bc-' + idx">
          <q-item-section>
            <q-item-label caption style="font-size: 0.65rem" class="text-teal">{{ parseFloat(content.price).toFixed(2) }}</q-item-label>
            <q-item-label><span class="text-teal text-bold">{{ content.quantity }} x </span>{{ content.name }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label caption style="font-size: 0.55rem">DISCOUNT</q-item-label>
            <q-item-label><span class="text-teal text-bold">{{ Math.round(parseFloat(content.discount)).toFixed(2) }}</span></q-item-label>
          </q-item-section>
          <q-item-section side class="text-teal text-bold text-subtitle2">{{ Math.round((parseFloat(content.quantity) * parseFloat(content.price)) - parseFloat(content.discount)).toFixed(2) }}</q-item-section>
        </q-item>
        <div v-if="content.tax && parseFloat(content.tax.amount) > 0" style="transform: translateY(-0.4rem)">
          <div class="q-px-md text-grey" style="font-size: 0.65rem">Included Tax Details<br />{{ content.tax.name }} - {{ Math.round(parseFloat(content.tax.amount)).toFixed(2) }}</div>
          <div v-show="content.tax.contents && content.tax.contents.length > 1">
            <div class="q-px-xl" style="font-size: 0.65rem" v-for="(tax,idx1) in content.tax.contents" :key="'abd-i-'+idx+'-tc-' + idx1"><q-icon name="subdirectory_arrow_right" /> {{ tax.name }} - {{ Math.round(tax.amount).toFixed(2) }}</div>
          </div>
        </div>
        <q-separator class="q-mt-xs" />
      </template>
    </q-list>
    <q-list separator v-if="payments.length > 0">
      <q-item-label header>Payments</q-item-label>
      <q-item v-for="(payment,idx) in payments" :key="'ab-dv-b-' + bill.id + '-ps-' + idx" class="bg-grey-2">
        <q-item-section avatar><q-item-label caption>{{ payment.type }}</q-item-label></q-item-section>
        <q-item-section>
          <q-item-label class="text-body2 text-caption">{{ human_date2(payment.date) }}</q-item-label>
          <q-item-label caption v-if="payment.detail" style="font-size: 0.65rem">{{ payment.detail }}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-teal text-bold text-subtitle2">{{ parseFloat(payment.amount).toFixed(2) }}</q-item-section>
        <q-item-section side><q-icon name="close" color="red" size="xs" class="cursor-pointer" @click="payment_cancel(payment)" /></q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar><q-item-label caption>&nbsp;</q-item-label></q-item-section>
        <q-item-section><q-item-label class="text-body2 text-bold text-teal">Total Paid</q-item-label></q-item-section>
        <q-item-section side class="text-teal text-bold text-subtitle2">{{ parseFloat(bill.paid).toFixed(2) }}</q-item-section>
        <q-item-section side><q-icon name="close" color="white" size="xs" /></q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-card-actions class="bg-grey-3" v-show="bill.progress !== 'Cancelled'">
      <q-btn type="a" size="sm" dense flat text-color="red" label="Cancel Bill" @click="bill_cancel" />
      <q-space />
      <q-btn dense color="cyan" size="sm" v-show="bill.payable > bill.paid" label="Add Payment" @click="add_payment = true" />
      <q-btn dense color="teal" size="sm" label="Print" @click="$emit('print')" />
    </q-card-actions>
    <q-dialog persistent v-model="add_payment" transition-show="zoom-in" transition-hide="zoom-out">
      <BillPaymentAdd :bill="bill" style="min-width: 60vw" @added="add_payment = false" />
    </q-dialog>
  </q-card>
</template>

<script>
import {human_date2} from "assets/helpers";
import BillPaymentAdd from "components/Archive/Bill/BillPaymentAdd";

export default {
  name: "BillDetail",
  components: {BillPaymentAdd},
  props: ['bill'],
  data(){ return {
    add_payment: false,
  } },
  computed: {
    payments(){ return this.bill && this.bill.payments.length ? _.filter(this.bill.payments,['status','Active']) : [] },
  },
  methods: {
    human_date2,
    payment_cancel({ id }){ this.$store.dispatch('payments/cancel',id,{ root:true }) },
    bill_cancel(){ this.$store.dispatch('bills/cancel',this.bill,{ root:true }) }
  }
}
</script>
