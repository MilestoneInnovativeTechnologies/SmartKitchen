<template>
  <q-page padding>
    <ReportCard v-if="kitchen" title="Kitchen Stock" :head="head" :table="table" :center="['Sold Today']" :right="['Stock']" index :foot="foot" />
    <div v-else class="text-center">Select Kitchen</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_today, to_format} from "assets/helpers";
import {mapState} from "vuex";
import Tokens from "assets/mixins/Tokens";

export default {
  name: "PageReportKitchenStock",
  components: {ReportCard},
  mixins: [Tokens],
  computed: {
    ...mapState({
      kitchen({ kitchens: { items } }){ let kitchen = _.get(this.$store.state.public,'kitchen'); return kitchen ? Object.assign({},kitchen,{ items: items[kitchen.id] }) : null },
      items({ items: { data } }){ return data },
    }),
    head(){ return _.zipObject(['Kitchen','Date'],[this.kitchen.name,to_format('DD/MMM/YYYY hh:mm A')]) },
    item_sold(){ return _(this.tokens).filter(({ date,progress }) => is_today(date) && progress !== 'Cancelled').flatMap('items').groupBy('item.id').mapValues(tis => _.sumBy(tis,({ quantity,progress }) => ['Cancelled','New'].includes(progress) ? 0 : quantity)).value() },
    table(){ return _(this.kitchen.items).sortBy(({ item,stock }) => stock /*this.items[item].name*/).map(({ item,stock }) => _.zipObject(['Item','Sold Today','Stock'],[_.get(this.items,[item,'name'],'-'),_.get(this.item_sold,item,0),stock])).value() },
    foot(){ return _.countBy(this.table,({ Stock }) => Stock === 0 ? 'Zero Stock Items' : (Stock < 0 ? 'Negative Stock Items' : (Stock < 10 ? 'Least Stock Items ( <10 )' : 'Stock Items'))) }
  }
}
</script>
