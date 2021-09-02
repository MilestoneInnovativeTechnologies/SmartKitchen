<template>
  <q-page padding>
    <ReportCard v-if="item" title="Item Wise Sales Summary" :head="head" :table="table" :right="['Amount']" :center="['Quantity']" :foot="foot" />
    <div v-else class="text-center">Select Item</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportItemWiseSaleSummary",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, item(){ return this.$store.state.public.item },
    head(){ return _.zipObject(['Item','Start Date', 'End Date'],[this.item.name,to_format('DD/MM/YYYY hh:mm A',this.range.from),to_format('DD/MM/YYYY hh:mm A',this.range.to)]) },
    date_bills(){ return _(this.bills).filter(({ date,progress }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)).keyBy('id').value() },
    items(){ let bill_tokens = _.map(this.date_bills,'token.id'); return _(this.tokens).filter(({ id }) => bill_tokens.includes(id)).flatMap(({ items,type,customer,date }) => _.map(items,ti => ti.item.id === this.item.id ? Object.assign({},ti, { type,customer,date }) : null)).filter().value() },
    table(){ return _(this.items).sortBy(({ date }) => extract_date(date).getTime()).map(ti => _.zipObject(['Date','Token','Type','Customer','Quantity','Amount'],[to_format('DD/MMM hh:mm a',ti.date),ti.token,ti.type,_.get(ti,['customer','name'],''),ti.quantity,this.amount(ti.token)])).value() },
    type_summary(){ return _(this.table).groupBy('Type').mapValues(tis => `(${_.sumBy(tis,'Quantity')}), ${precision(_.sumBy(tis,({ Amount }) => _.toNumber(Amount)),2)}`).value() },
    foot(){ return Object.assign({},this.type_summary,{ Total: `(${_.sumBy(this.table,'Quantity')}), ${precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount)),2)}`}) }
  },
  methods: {
    amount(token_id){
      let bill = _.find(this.bills,({ progress,token }) => token && progress !== 'Cancelled' && token.id === token_id);
      let { price,discount,quantity } = _.find(bill.contents,['item',this.item.id]); return precision((_.toNumber(price) * _.toNumber(quantity)) - _.toNumber(discount),2)
    }
  }
}
</script>
