<template>
  <q-page padding>
    <ReportCard title="Item Wise Sales Count" :head="head" :table="table" :right="['Quantities']" :center="['Sales']" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_date_same, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportSalesCountItemWise",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    control_date(){ return this.$store.state.public.date + ' 00:00:00' },
    head(){ return _.zipObject(['Report','Date'],['Item Wise Sales Count',to_format('Do MMM YYYY',this.$store.state.public.date)]) },
    date_bills(){ return _.filter(this.bills,({ date,progress }) => progress !== 'Cancelled' && is_date_same(date,this.control_date)) },
    bill_tokens(){ let bill_tokens = _.map(this.date_bills,'token.id'); return _(this.tokens).filter(({ id }) => bill_tokens.includes(id)).value() },
    items(){ return _.groupBy(_.flatMap(this.bill_tokens,'items'),'item.id') },
    table(){ return _(this.items).map(tokens => _.zipObject(['Item','Sales','Quantities'],[_.get(tokens[0],['item','name']),_.size(tokens),_.sumBy(tokens,'quantity')])).sortBy('Sales').reverse().value() },
  }
}
</script>
