<template>
  <q-page padding>
    <ReportCard title="Bill Summary" :head="head" :table="table" :right="['Payable','Paid','Balance']" index :foot="foot" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";
import {is_between, precision, range, time, to_format} from "assets/helpers";

export default {
  name: "PageReportBillSummaryCustomer",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Bill Summary',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    table(){ return _(this.bills).filter(({ date,progress }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)).map(({ date,payable,paid,customer }) => _.zipObject(['Time','Customer','Payable','Paid','Balance'],[
      time(date),_.get(customer,'name'),precision(payable,2),precision(paid,2),precision(payable-paid,2)
    ])).value() },
    foot(){ return _.zipObject(['Total Payable','Total Paid','Total Balance'],[precision(_.sumBy(this.table,({ Payable }) => _.toNumber(Payable)),2),precision(_.sumBy(this.table,({ Paid }) => _.toNumber(Paid)),2),precision(_.sumBy(this.table,({ Balance }) => _.toNumber(Balance)),2)]) }
  }
}
</script>
