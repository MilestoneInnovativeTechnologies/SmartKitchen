<template>
  <q-page padding>
    <ReportCard title="Day Token Summary" :table="table" index :head="head" :foot="foot" :right="['Amount']" />
  </q-page>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {extract_date, is_date_same, precision, time, to_format} from "assets/helpers";
import {bill_payable} from "assets/module_helpers";
import ReportCard from "pages/Report/ReportCard";

export default {
  name: "PageReportDayTokenSummary",
  components: {ReportCard},
  mixins: [Tokens],
  computed: {
    control_date(){ return this.$store.state.public.date + ' 00:00:00' },
    token_amount(){ return _(this.$store.state.bills.data).groupBy('token').mapValues(bills => _.sumBy(bills,bill => bill.progress !== 'Cancelled' ? bill_payable(bill) : 0)).value() },
    day_tokens(){ return _.filter(this.tokens,({ date,progress }) => progress !== 'Cancelled' && is_date_same(date,this.control_date,'day')) },
    table(){ return _(this.day_tokens).sortBy(({ date }) => extract_date(date).getTime()).map(({ id,date,progress }) => _.zipObject(['Token','Time','Status','Amount'],[id,time(date),progress,precision(_.get(this.token_amount,id,0))])).value() },
    head(){ return _.zipObject(['Date','Day'],[to_format('MMM/YYYY',this.control_date),to_format('Do - ddd',this.control_date)]) },
    foot(){ return Object.assign(_.countBy(this.table,({ Status }) => Status + ' Tokens'),{'Total Tokens':_.size(this.table) },{ 'Total Amount': precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount))) }) }
  }
}
</script>
