<template>
  <q-page padding>
    <ReportCard title="Sales By Type" :head="head" :table="table" :foot="foot" :center="['Sales']" :right="['Amount']" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";
import {is_between, precision, range, to_format} from "assets/helpers";
import {bill_payable} from "assets/module_helpers";
export default {
  name: "PageReportSalesByType",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    control_date(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Sales By Type Summary',to_format('DD/MM/YYYY hh:mm A',this.control_date.from),to_format('DD/MM/YYYY hh:mm A',this.control_date.to)]) },
    range_bills(){ return _.filter(this.$store.state.bills.data,({ date,progress }) => progress !== 'Cancelled' && is_between(date,this.control_date.from,this.control_date.to)) },
    token_type(){ return _(this.tokens).mapKeys('id').mapValues('type').value() },
    type_grouped(){ return _(this.range_bills).groupBy(({ token }) => _.get(this.token_type,token,'-')).value() },
    table(){ return _.map(this.type_grouped,(bills,type) => _.zipObject(['Type','Sales','Amount'],[type,_.size(bills),precision(_.sumBy(bills,bill => bill_payable(bill)),2)])) },
    foot(){ return _.zipObject(['Total Sales','Total Amount'],[_.sumBy(this.table,'Sales'),precision(_.sumBy(this.table,({Amount}) => _.toNumber(Amount)),2)]) }
  }
}
</script>
