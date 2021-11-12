<template>
  <q-page padding>
    <ReportCard title="Day - Remote Orders" :head="head" :table="table" :right="['Amount','Discount','Payable','Status']" :center="['Token']" :foot="foot" />
  </q-page>
</template>

<script>
import {human_date, is_between, is_date_same, precision, range, to_format} from "assets/helpers";
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportDayWiseRemoteOrderSummary",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' },
    head(){ return _.zipObject(['Date'],[to_format('DD/MMM (dddd)',this.date)]) },
    remote_orders(){ return _.filter(this.bills,({ token:{ date,progress } }) => progress !== 'Cancelled' && is_date_same(date,this.date,'day')) },
    table(){ return _(this.remote_orders).map(({ token,customer,amount,discount,payable }) => _.zipObject(['Time','Customer','Token','Amount','Discount','Payable','Status'],
      [human_date(token.date,true),_.get(customer,'name'),token.id,precision(amount),precision(discount),precision(payable),token.progress])).value() },
    foot(){ return _.zipObject(['Orders','Amount','Discount','Payable','Paid'],
      [_.size(this.remote_orders),precision(sumOf(this.remote_orders,'amount')),precision(sumOf(this.remote_orders,'discount')),precision(sumOf(this.remote_orders,'payable')),precision(_.sumBy(this.remote_orders,({ payments }) => sumOf(payments,'amount')))]) }
  }
}
function sumOf(array,key){ return _.sumBy(array,obj => _.toNumber(_.get(obj,key,0))) }
</script>
