<template>
  <q-page padding>
    <ReportCard v-if="customer" title="Remote Orders by Customer" :head="head" :table="table" :right="['Amount','Discount','Payable','Status']" :center="['Token']" :foot="foot" />
    <div v-else class="text-center text-bold">Select A Customer</div>
  </q-page>
</template>

<script>
import {human_date, is_between, precision, range, to_format} from "assets/helpers";
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportRemoteOrderSummaryByCustomer",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' },
    range(){ return range(this.$store.state.public.range) },
    customer(){ return this.$store.state.public.customer || {} },
    head(){ return _.zipObject(['Customer','From','To'],[_.get(this.customer,'name'),to_format('DD/MMM',this.range.from),to_format('DD/MMM',this.range.to)]) },
    remote_orders(){ return _.filter(this.bills,({ token:{ date,progress,type,customer } }) => customer.id === this.customer.id && type === 'Remote' && progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)) },
    table(){ return _(this.remote_orders).map(({ token,amount,discount,payable }) => _.zipObject(['Time','Token','Amount','Discount','Payable','Status'],
      [human_date(token.date,true),token.id,precision(amount),precision(discount),precision(payable),token.progress])).value() },
    foot(){ return _.zipObject(['Orders','Discount','Total Payable','Total Paid'],[_.size(this.remote_orders),precision(_.sumBy(this.remote_orders,({ discount }) => _.toNumber(discount))),precision(_.sumBy(this.remote_orders,'payable')),precision(_.sumBy(this.remote_orders,({ payments }) => _.sumBy(payments,({ amount }) => _.toNumber(amount))))]) }
  }
}
</script>
