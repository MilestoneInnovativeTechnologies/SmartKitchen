<template>
  <q-page padding>
    <ReportCard title="Payments" :head="head" :table="table" :right="['Bill Amount','Paid']" :foot="foot" index />
  </q-page>
</template>

<script>
import ReportCard from "pages/Report/ReportCard";
import {is_between, precision, range, to_format} from "assets/helpers";
import {bill_payable} from "assets/module_helpers";

export default {
  name: "PageReportPayments",
  components: {ReportCard},
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Payments',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    bill_amounts(){ return _(this.$store.state.bills.data).filter(({ progress }) => progress !== 'Cancelled').keyBy('id').mapValues(bill => bill_payable(bill)).value() },
    table(){ return _(this.$store.state.payments.data).filter(({ date,status }) => status === 'Active' && is_between(date,this.range.from,this.range.to)).map(({ date,bill,type,amount }) => _.zipObject(['Date','Bill','Bill Amount','Type','Paid'],[
      to_format('Do hh:mm a',date),bill,precision(_.get(this.bill_amounts,bill,0)),type,precision(amount)
    ])).value() },
    foot(){
      let group = _.groupBy(this.table,'Type'); return Object.assign({},
        _(group).mapKeys((val,key) => key + ' Payments').mapValues(_.size).value(),
        _(group).mapKeys((val,key) => key + ' Amount').mapValues(pys => precision(_.sumBy(pys,({Paid}) => _.toNumber(Paid)))).value(),
        { Total:precision(_.sumBy(this.table,({ Paid }) => _.toNumber(Paid))) }
      )
    }
  }
}
</script>
