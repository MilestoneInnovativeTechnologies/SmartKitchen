<template>
  <q-page padding>
    <ReportCard title="Remote Orders by Customer" :head="head" :table="table" index :right="['Amount']" :foot="foot" />
  </q-page>
</template>

<script>
import {is_between,precision,range,to_format} from "assets/helpers";
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportRemoteOrdersByCustomer",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' },
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['From','To'],[to_format('DD/MMM',this.range.from),to_format('DD/MMM',this.range.to)]) },
    remote_orders(){ return _.filter(this.bills,({ token:{ date,progress,type } }) => type === 'Remote' && progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)) },
    table(){ return _(this.remote_orders).groupBy(({ customer }) => customer ? customer.name : '--no-customer--').mapValues((bills,customer) => _.zipObject(['Customer','Orders','Amount'],[customer,_.size(bills),precision(_.sumBy(bills,'payable'))])).values().value() },
    foot(){ return _.zipObject(['Orders','Total'],[_.size(this.remote_orders),precision(_.sumBy(this.remote_orders,'payable'))]) }
  }
}
</script>
