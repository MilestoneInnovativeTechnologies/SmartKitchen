<template>
  <q-page padding>
    <ReportCard v-if="group" title="Group Items Order Summary" :head="head" :table="table" :foot="foot" index :center="['Orders','Quantity']" right="Amount" />
    <div v-else class="text-center">Select Group Item</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {mapState} from "vuex";

export default {
  name: "PageReportGroupItemsOrderSummary",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, group(){ return this.$store.state.public.group },
    ...mapState({ items:function(state){ return _.map(_.get(this.group,'items',[]),i_id => _.get(state.items.data,i_id)) } }),
    head(){ return _.zipObject(['Group','Total Items','Start Date','End Date','Total Orders'],[_.get(this.group,'name'),_.size(_.get(this.group,'items',[])),to_format('DD/MM/YYYY hh:mm A',this.range.from),to_format('DD/MM/YYYY hh:mm A',this.range.to),this.range_tokens.length]) },
    range_tokens(){ return _.filter(this.tokens_own,token => is_between(token.date,this.range.from,this.range.to)) },
    table(){ return _(this.items).map(item => _.zipObject(['Name','Orders','Quantity','Amount'],
      [item.name,this.orders(item.id),this.quantities(item.id),this.amount(item.id)]
    )).value() },
    foot(){ return { 'Quantities':_.sumBy(this.table,'Quantity'),'Amount':precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount)),2) } },
    item_orders(){
      let itks = {}; _.forEach(this.range_tokens,token => _.forEach(token.items,ti => {
        let i_id = _.get(ti,['item','id']);
        if(!_.has(itks,i_id)) itks[i_id] = [];
        itks[i_id].push(token)
      }))
      return itks;
    }
  },
  methods: {
    orders(i_id){ return _.size(_.get(this.item_orders,i_id)) },
    quantities(i_id){ return _.sumBy(_.get(this.item_orders,i_id),token => _.sumBy(token.items,ti => _.get(ti,['item','id']) === i_id ? _.get(ti,'quantity')  : 0)) },
    amount(i_id){ return precision(_.sumBy(_.get(this.item_orders,i_id),token => _.sumBy(token.items,ti => _.get(ti,['item','id']) === i_id ? (_.get(ti,'quantity') *_.get(ti,'price'))  : 0))) }
  }
}
</script>
