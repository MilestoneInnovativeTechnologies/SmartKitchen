<template>
  <q-page padding>
    <ReportCard v-if="type" title="Payments by Type" :head="head" index :table="table" :foot="foot" :center="['Token/Bill']" :right="['Bill Amount','Paid Amount','Balance']" />
    <div v-else class="text-center">Select Payment Type</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, human_date, is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillPaymentsType",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, type(){ return this.$store.state.public.payment_type },
    head(){ return _.zipObject(['Report','Payment Type','Date From','Date To'],['Payments',this.type,to_format('ddd - Do MMM hh:mm A',this.range.from),to_format('ddd - Do MMM hh:mm A',this.range.to)]) },
    date_bills(){ return _(this.bills).filter(({ progress,payments }) => progress !== 'Cancelled' && payments.length && is_any_between(payments,this.range.from,this.range.to)).value() },
    payments(){ return _(this.date_bills).flatMap(bill => _.map(bill.payments,payment => Object.assign({},payment, { bill }))).filter(({ date,type,status }) => status === 'Active' && type === this.type && is_between(date,this.range.from,this.range.to)).sortBy(({ date }) => extract_date(date).getTime()).value() },
    table(){ return _(this.payments).map(({ id,date,bill,amount }) => _.zipObject(['ID','Time','Token/Bill','Customer','Bill Amount','Paid Amount','Balance'],[
      id,human_date(date,true),`${bill.token.id}/${id}`,_.get(bill,['customer','name']),precision(_.get(bill,['payable'])),precision(amount),_.toNumber(_.get(bill,['payable']))-_.toNumber(amount)
    ])).value() },
    foot(){ return _.zipObject(['Payments','Amount'],[
      _.size(this.table),_.sumBy(this.table,record => _.toNumber(record['Paid Amount'])),
    ]) },
  }
}
function is_any_between(ary,from,to){ return _.some(ary,({ date }) => is_between(date,from,to)) }
function total(bills,key){ return _.sumBy(bills,bill => _.toNumber(_.get(bill,key))) }
</script>
