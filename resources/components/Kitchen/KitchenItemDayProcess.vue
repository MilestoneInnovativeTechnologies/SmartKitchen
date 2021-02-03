<template>
  <div class="row q-col-gutter-xs">
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="tokens.length" title="Tokens" bg="cyan" text="white" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="items.length + '(' + quantities + ')'" title="Items & Quantities" bg="blue" text="white" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="pending" title="In Processing" bg="orange" text="white" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="completed" title="Completed" bg="green" text="white" /></div>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import DigitMetric from "components/Metric/DigitMetric";
export default {
  name: "KitchenItemDayProcess",
  components: {DigitMetric},
  data(){ return {
    process_progress: ['Accepted','Processing','Completed','Served']
  } },
  computed: {
    ...mapGetters('tokens',['today']),
    ...mapState({
      tokens: function({ tokens:{ items } }){ return _.map(this.today,token => Object.assign({},token,{ items: items[token.id] })) },
      kitchens: function({ kitchens:{ assign,data }}){ return _.map(assign,kid => data[kid]) },
    }),
    kids(){ return _.map(this.kitchens,'id') },
    items(){ return _.flatMap(this.tokens,({ items }) => _.filter(items,({ kitchen,progress }) => this.kids.includes(kitchen) && this.process_progress.includes(progress))) },
    quantities(){ return _.sumBy(this.items,({ quantity }) => _.toNumber(quantity)) },
    pending(){ return _.sumBy(this.items,({ quantity,progress }) => progress === 'Processing' ? _.toNumber(quantity) : 0) },
    completed(){ return _.sumBy(this.items,({ quantity,progress }) => ['Completed','Served'].includes(progress) ? _.toNumber(quantity) : 0) },
  }
}
</script>
