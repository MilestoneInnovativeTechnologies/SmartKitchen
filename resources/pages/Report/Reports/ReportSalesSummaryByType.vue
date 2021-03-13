<template>
  <q-page padding>
    <ReportCard title="Sales Summary By Type" :head="head" :table="table" :foot="foot" :right="['Amount']" />
  </q-page>
</template>

<script>
import ReportCard from "pages/Report/ReportCard";
import Bills from "assets/mixins/Bills";
import {is_between, precision, range, time, to_format} from "assets/helpers";
import {bill_payable} from "assets/module_helpers";
export default {
  name: "PageReportSalesSummaryByType",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    control_date(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Order Type','Start Date','End Date'],['Sales By Type Summary',this.$store.state.public.sale_type,to_format('DD/MM/YYYY hh:mm A',this.control_date.from),to_format('DD/MM/YYYY hh:mm A',this.control_date.to)]) },
    available_tokens(){ return _.get(_(this.tokens).groupBy('type').mapValues(tokens => _.map(tokens,'id')).value(),this.$store.state.public.sale_type) },
    list_bills(){ return _.filter(this.$store.state.bills.data,({ date,progress,token }) => progress !== 'Cancelled' && _.includes(this.available_tokens,token) && is_between(date,this.control_date.from,this.control_date.to)) },
    table(){ return _.map(this.list_bills,bill => _.zipObject(['Time','Token','Customer','Amount'],[time(bill.date),bill.token,_.get(_.find(this.tokens,['id',bill.token]),['customer','name'],'NA'),precision(bill_payable(bill),2)])) },
    foot(){ return _.zipObject(['Total Sales','Total Amount'],[_.size(this.table),precision(_.sumBy(this.table,({Amount}) => _.toNumber(Amount)),2)]) }
  }
}
</script>
