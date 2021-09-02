<template>
  <q-page padding>
    <ReportCard title="Payments" :head="head" :table="table" index :right="['Amount']" :foot="foot" :center="['Payments']" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, precision, range, to_format} from "assets/helpers";

export default {
  name: "PageReportPaymentsByType",
  components: {ReportCard},
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Payments',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    table(){ return _(this.$store.state.payments.data).filter(({ date,status }) => status === 'Active' && is_between(date,this.range.from,this.range.to)).groupBy('type').map((pys,type) => _.zipObject(['Type','Payments','Amount'],[
      type,_.size(pys),precision(_.sumBy(pys,({ amount }) => _.toNumber(amount)))
    ])).value() },
    foot(){ return _.zipObject(["Total"],[precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount)))]) }
  }
}
</script>
