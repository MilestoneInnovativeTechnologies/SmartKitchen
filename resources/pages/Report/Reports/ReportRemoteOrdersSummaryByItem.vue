<template>
  <q-page padding>
    <ReportCard v-if="item" title="Remote Orders Summary of Item" :head="head" :table="table" :center="['Orders','Quantities','New','Processing','Completed','Served']" :foot="foot" />
    <div v-else class="text-center text-bold">Select An Item</div>
  </q-page>
</template>

<script>
import {is_between,range,to_format} from "assets/helpers";
import ReportCard from "components/Report/ReportCard";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageRemoteOrdersSummaryByItem",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    item(){ return _.get(this.$store.state.public,'item',null) },
    head(){ return _.zipObject(['Item','Date From','Date To'],[this.item.name,to_format('DD/MMM hh:mm A',this.range.from),to_format('DD/MMM hh:mm A',this.range.to)]) },
    remote_order_items(){ return _(this.bills).filter(({ progress,date }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)).flatMap('token.items').filter(({ item }) => item.id === this.item.id).value() },
    table(){ return _(this.remote_order_items).map(item => _.zipObject(['Customer','Token','Quantity','Kitchen','Delivery','Progress'],[
      _.get(this.tokens,[item.token,'customer','name']),item.token,item.quantity,_.get(item,['kitchen','name'],'--no-kitchen--'),item.deliver_human,item.progress
    ])).value() },
    foot(){ return _.zipObject(['Orders','Quantities'],[_.size(this.table),sumOf(this.table,'Quantity')]) }
  }
}
function sumOf(array,key){ return _.sumBy(array,obj => _.toNumber(_.get(obj,key,0))) }
function countIfProg(array,value){ return _.sumBy(array,obj => _.toSafeInteger(_.get(obj,'progress') === value)) }
</script>
