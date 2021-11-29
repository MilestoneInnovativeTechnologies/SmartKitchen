<template>
  <q-page padding>
    <ReportCard v-if="customer" title="Bill By Customer" :head="head" index :table="table" :foot="foot" :center="['Token/Bill','Items']" :right="['Amount','Discount','Payable','Paid','Balance']" />
    <div v-else class="text-center">Select Customer</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, to_format, range, is_between, human_date} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillCustomer",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, customer(){ return this.$store.state.public.customer },
    head(){ return _.zipObject(['Report','Phone','Date From','Date To'],['Bills By ' + this.customer.name,this.customer.phone,to_format('ddd - Do MMM hh:mm A',this.range.from),to_format('ddd - Do MMM hh:mm A',this.range.to)]) },
    date_bills(){ return _(this.bills).filter(({ date,progress }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)).value() },
    customer_bills(){ return _(this.date_bills).filter(({ customer }) => customer && customer.id === this.customer.id).sortBy(({ date }) => extract_date(date).getTime()).value() },
    table(){ return _(this.customer_bills).map(({ id,date,token,amount,discount,payable,paid }) => _.zipObject(['Time','Token/Bill','Type','Amount','Discount','Payable','Paid','Balance'],[
      human_date(date,true),`${token.id}/${id}`,token.type,amount,discount,payable,paid,payable-paid
    ])).value() },
    foot(){ return _.zipObject(['Bills','Total Payable','Total Paid','Total Balance'],[
      _.size(this.customer_bills),_.sumBy(this.table,'Payable'),_.sumBy(this.table,'Paid'),_.sumBy(this.table,'Balance')
    ]) },
  }
}
</script>
