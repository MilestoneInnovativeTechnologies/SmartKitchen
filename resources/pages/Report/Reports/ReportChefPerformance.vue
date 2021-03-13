<template>
  <q-page padding>
    <ReportCard v-if="chef" title="Chef Performance" :head="head" index :table="table" :center="['Tokens','Quantities','Accept','Start','Process','Complete']" />
    <div v-else class="text-center text-bold">Select A Chef</div>
  </q-page>
</template>

<script>
import ReportCard from "pages/Report/ReportCard";
import {is_between, is_date_same, precision, range, time, to_format} from "assets/helpers";
import Tokens from "assets/mixins/Tokens";
import {token_timing_average} from "assets/module_helpers";

export default {
  name: "PageReportChefPerformance",
  components: {ReportCard},
  mixins: [Tokens],
  computed: {
    range(){ return range(this.$store.state.public.range) }, chef(){ return this.$store.state.public.user },
    head(){ return _.zipObject(['Report','Chef','Date Range','Unit'],['Chef Performance',this.chef.name,to_format('DD/MMM HH:mm',this.range.from) + ' - ' + to_format('DD/MMM HH:mm',this.range.to),'Minutes']) },
    items(){ return _(this.tokens).filter(({ date,progress,items }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to) && _.some(items,({ progress_timing }) => _.findIndex(progress_timing,['auth',this.chef.id])>-1 || _.findIndex(progress_timing,['user',this.chef.id])>-1)).flatMap('items').filter(({ progress_timing }) => _.findIndex(progress_timing,['auth',this.chef.id])>-1 || _.findIndex(progress_timing,['user',this.chef.id])>-1).groupBy(({ item,kitchen }) => item.name + '|' + kitchen.name).value() },
    table(){ return _(this.items).map((tis,IK) => Object.assign(
      {}, { Item:IK.split('|')[0],Kitchen:IK.split('|')[1] }, this.properties(tis[0].item,tis[0].kitchen),
      { Tokens:_.size(tis),Quantities:_.sumBy(tis,'quantity') },
      _(token_timing_average(this.timings(tis),this.quantities(tis))).mapKeys((v,key) => _.startCase(key)).mapValues(val => _.round(val/60)).omit(['Serve']).value()
    )).sortBy('Item').value() }
  },
  methods: {
    properties(I,K){ let item = { auto_accept:K.auto_accept,...(_.find(this.$store.state.kitchens.items[K.id], ['item', I.id])) }; return { Time: _.toInteger(_.get(item,'duration',0)/60),Auto:_(item).map((val,key) => val === 'Yes' ? _.startCase(key.replace('auto_','')) : null).filter().value().join(', ') } },
    timings(tis){ return _.map(tis,'progress_timing') },
    quantities(tis){ return _.sumBy(tis,'quantity') },
  }
}
</script>
