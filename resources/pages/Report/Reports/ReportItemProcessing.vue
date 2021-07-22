<template>
  <q-page padding>
    <ReportCard v-if="item" title="Item Processing" :head="head" index :table="table" :center="['Tokens','Quantities','Accept','Start','Process','Complete','Serve']" />
    <div v-else class="text-center text-bold">Select Item</div>
  </q-page>
</template>

<script>
import ReportCard from "pages/Report/ReportCard";
import {is_between, range, to_format} from "assets/helpers";
import Tokens from "assets/mixins/Tokens";
import {token_timing_average} from "assets/module_helpers";

export default {
  name: "PageReportItemProcessing",
  components: {ReportCard},
  mixins: [Tokens],
  computed: {
    range(){ return range(this.$store.state.public.range) }, item(){ return this.$store.state.public.item },
    head(){ return _.zipObject(['Report','Item','Date Range','Unit'],['Item Processing',this.item.name,to_format('DD/MMM HH:mm',this.range.from) + ' - ' + to_format('DD/MMM HH:mm',this.range.to),'Minutes']) },
    items(){ return _(this.tokens_own).filter(({ date,progress,items }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to) && _.some(items,({ item:{ id }}) => this.item.id === id)).flatMap('items').filter(['item.id',this.item.id]).groupBy('kitchen.name').value() },
    table(){ return _(this.items).map((tis,Kitchen) => Object.assign(
      {}, { Kitchen }, this.properties(tis[0].kitchen),
      { Tokens:_.size(tis),Quantities:_.sumBy(tis,'quantity') },
      _(token_timing_average(this.timings(tis),this.quantities(tis))).mapKeys((v,key) => _.startCase(key)).mapValues(val => _.round(val/60)).value()
    )).value() }
  },
  methods: {
    properties({ id,auto_accept }){ let item = { auto_accept,...(_.find(this.$store.state.kitchens.items[id],['item',this.item.id])) }; return { Time: _.toInteger(_.get(item,'duration',0)/60),Auto:_(item).map((val,key) => val === 'Yes' ? _.startCase(key.replace('auto_','')) : null).filter().value().join(', ') } },
    timings(tis){ return _.map(tis,'progress_timing') },
    quantities(tis){ return _.sumBy(tis,'quantity') },
  }
}
</script>
