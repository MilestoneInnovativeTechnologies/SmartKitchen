<template>
  <q-page padding>
    <ReportCard title="Payments" :head="head" index :table="table" :foot="foot" :center="['Token/Bill','Items']" :right="['Bill Amount','Payment Amount','Bill Balance']" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, human_date, is_between, is_date_same, precision, range, time, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillPayments",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Date From','Date To'],['Bills Payments',to_format('ddd - Do MMM hh:mm A',this.range.from),to_format('ddd - Do MMM hh:mm A',this.range.to)]) },
    date_bills(){ return _(this.bills).filter(({ progress,payments }) => progress !== 'Cancelled' && payments.length && is_any_between(payments,this.range.from,this.range.to)).value() },
    payments(){ return _(this.date_bills).flatMap(bill => _.map(bill.payments,payment => Object.assign({},payment, { bill }))).filter(({ date }) => is_between(date,this.range.from,this.range.to)).sortBy(({ date }) => extract_date(date).getTime()).value() },
    table(){ return _(this.payments).map(({ id,date,type,bill,amount }) => _.zipObject(['ID','Date','Type','Customer','Bill/Token','Bill Amount','Payment Amount','Bill Balance'],[
      id,human_date(date,true),type,bill.customer.name,[bill.id,bill.token.id].join('/'),precision(bill.payable),precision(amount),precision(bill.payable-bill.paid)
    ])).value() },
    foot(){
      let type_sum = _(this.table).groupBy('Type').mapValues(types => precision(_.sumBy(types,(payment) => _.toNumber(payment['Payment Amount'])))).value();
      let foot_details = _.zipObject(['Payments','Total'],[_.size(this.table),precision(_.sum(_.map(_.values(type_sum),_.toNumber)))])
      return Object.assign({},type_sum,foot_details);
    },
  }
}
function is_any_between(ary,from,to){ return _.some(ary,({ date }) => is_between(date,from,to)) }
function total(bills,key){ return _.sumBy(bills,bill => _.toNumber(_.get(bill,key))) }
</script>
