<template>
  <q-page padding>
    <ReportCard v-if="customer" title="Unpaid Bills of Customer" :head="head" index :table="table" :foot="foot" :center="['Token']" :right="['Amount','Discount','Payable']" />
    <div v-else class="text-center">Select Customer</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {human_date, is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillUnpaidCustomer",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, customer(){ return this.$store.state.public.customer },
    head(){ return _.zipObject(['Report','Customer','Date From','Date To'],['Unpaid Bills',this.customer.name,to_format('ddd - Do MMM hh:mm A',this.range.from),to_format('ddd - Do MMM hh:mm A',this.range.to)]) },
    date_customer_bills(){ return _(this.bills).filter(({ progress,date,customer }) => progress === 'Pending' && is_between(date,this.range.from,this.range.to) && customer.id === this.customer.id).value() },
    table(){ return _(this.date_customer_bills).map(({ id,date,token,amount,discount,payable }) => _.zipObject(['ID','Date','Token','Type','Amount','Discount','Payable'],[
      id,human_date(date,true),_.get(token,'id'),_.get(token,'type'),precision(amount),precision(discount),precision(payable)
    ])).value() },
    foot(){ return _.zipObject(['Bills','Amount'],[
      _.size(this.table),precision(_.sumBy(this.date_customer_bills,'payable')),
    ]) },
  }
}
</script>
