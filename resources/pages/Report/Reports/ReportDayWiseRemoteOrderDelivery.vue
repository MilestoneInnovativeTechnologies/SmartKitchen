<template>
  <q-page padding>
    <ReportCard title="Day - Remote Orders Deliveries" :head="head" :table="table" :right="['Progress']" :center="['Token']" :foot="foot" />
  </q-page>
</template>

<script>
import {is_date_same,time,to_format} from "assets/helpers";
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportDayWiseRemoteOrderDelivery",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' },
    head(){ return _.zipObject(['Delivery Date'],[to_format('DD/MMM (dddd)',this.date)]) },
    remote_order_items(){ return _(this.bills).filter(({ progress }) => progress !== 'Cancelled').flatMap('token.items').filter(({ deliver }) => is_date_same(deliver,this.date,'day')).value() },
    table(){ return _(this.remote_order_items).map(item => _.zipObject(['Time','Item','Quantity','Customer','Token','Progress'],[
      time(item.deliver),item.item.name,item.quantity,_.get(this.tokens,[item.token,'customer','name']),item.token,item.progress
    ])).value() },
    foot(){ return _.zipObject(['Orders','Quantities'],[_.size(this.remote_order_items),sumOf(this.remote_order_items,'quantity')]) }
  }
}
function sumOf(array,key){ return _.sumBy(array,obj => _.toNumber(_.get(obj,key,0))) }
</script>
