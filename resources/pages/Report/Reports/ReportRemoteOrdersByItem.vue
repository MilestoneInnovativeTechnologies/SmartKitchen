<template>
  <q-page padding>
    <ReportCard title="Item Wise Remote Orders" :head="head" :table="table" :center="['Orders','Quantities','New','Processing','Completed','Served']" :foot="foot" />
  </q-page>
</template>

<script>
import {is_between,range,to_format} from "assets/helpers";
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportRemoteOrdersByItem",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Date From','Date To'],[to_format('DD/MMM hh:mm A',this.range.from),to_format('DD/MMM hh:mm A',this.range.to)]) },
    remote_order_items(){ return _(this.bills).filter(({ progress,date,token }) => token.type === 'Remote' && progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)).flatMap('token.items').groupBy('item.name').value() },
    table(){ return _(this.remote_order_items).map((ary,item) => _.zipObject(['Item','Orders','Quantities','New','Processing','Completed','Served'],[
      item,_.size(ary),sumOf(ary,'quantity'),countIfProg(ary,'New')+countIfProg(ary,'Accepted'),countIfProg(ary,'Processing'),countIfProg(ary,'Completed'),countIfProg(ary,'Served')
    ])).value() },
    foot(){ return _.zipObject(['Items','Orders','Quantities'],[_.size(this.remote_order_items),_.sum(_.map(this.remote_order_items,ary => _.size(ary))),_.sum(_.map(this.remote_order_items,ary => sumOf(ary,'quantity')))]) }
  }
}
function sumOf(array,key){ return _.sumBy(array,obj => _.toNumber(_.get(obj,key,0))) }
function countIfProg(array,value){ return _.sumBy(array,obj => _.toSafeInteger(_.get(obj,'progress') === value)) }
</script>
