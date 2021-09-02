<template>
  <q-page padding>
    <ReportCard title="Day Sale Summary" :head="head" :table="table" index :right="['Amount']" :foot="foot" />
  </q-page>
</template>

<script>
import {extract_date, is_date_same, precision, time, to_format} from "assets/helpers";
import ReportCard from "components/Report/ReportCard";
import {bill_payable} from "assets/module_helpers";

export default {
  name: "PageReportDaySaleSummary",
  components: {ReportCard},
  computed: {
    control_date(){ return this.$store.state.public.date + ' 00:00:00' },
    head(){ return _.zipObject(['Date','Day'],[to_format('MMM/YYYY',this.control_date),to_format('Do - ddd',this.control_date)]) },
    day_bills(){ return _.filter(this.$store.state.bills.data,({ date,progress }) => progress !== 'Cancelled' && is_date_same(date,this.control_date,'day')) },
    table(){ return _(this.day_bills).sortBy(({date}) => extract_date(date).getTime()).map(bill => _.zipObject(['Time','Token','Amount'],[time(bill.date),bill.token,precision(bill_payable(bill),2)])).value() },
    foot(){ return _.zipObject(['Total'],[precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount)),2)]) }
  }
}
</script>
