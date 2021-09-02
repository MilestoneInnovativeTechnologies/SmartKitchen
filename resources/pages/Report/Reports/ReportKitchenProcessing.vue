<template>
  <q-page padding>
    <ReportCard v-if="kitchen" title="Kitchen Processing" :head="head" index :table="table" :center="['Time','Tokens','Quantities','Accept','Process','Complete']" />
    <div v-else class="text-center text-bold">Select Kitchen</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_date_same, to_format} from "assets/helpers";
import Tokens from "assets/mixins/Tokens";
import {token_timing_average} from "assets/module_helpers";

export default {
  name: "PageReportKitchenProcessing",
  components: {ReportCard},
  mixins: [Tokens],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' }, kitchen(){ let kitchen = this.$store.state.public.kitchen; return Object.assign({},kitchen,{ items: _.keyBy(this.$store.state.kitchens.items[kitchen.id],'item') }) },
    head(){ return _.zipObject(['Report','Kitchen','Auto Accept','Date','Unit'],['Kitchen Processing',this.kitchen.name,this.kitchen.auto_accept,to_format('ddd - Do MMM',this.date),'Minutes']) },
    date_tokens(){ return _(this.tokens).filter(({ date,progress }) => progress !== 'Cancelled' && is_date_same(date,this.date,'day')).value() },
    kitchen_items(){ return _(this.date_tokens).flatMap('items').filter(({ kitchen }) => kitchen && kitchen.id === this.kitchen.id).groupBy('item.name').value() },
    table(){ return _(this.kitchen_items).map((tis,Item) => Object.assign(
      {},{Item},this.properties(tis[0].item.id),
      {Tokens:_.size(tis),Quantities:_.sumBy(tis,'quantity')},
      _(token_timing_average(this.timings(tis),this.quantities(tis))).mapKeys((v,k) => _.startCase(k)).mapValues(v => _.round(v/60)).omit(['Start','Serve',this.kitchen.auto_accept === 'Yes' ? 'Accept' : null]).value()
    )).sortBy('Item').value() },
  },
  methods: {
    properties(item){ item = _.get(this.kitchen.items,item); return { Time: _.toInteger(_.get(item,'duration',0)/60),Auto:_(item).map((val,key) => val === 'Yes' ? _.startCase(key.replace('auto_','')) : null).filter().value().join(', ') } },
    timings(tis){ return _.map(tis,'progress_timing') },
    quantities(tis){ return _.sumBy(tis,'quantity') },
  }
}
</script>
