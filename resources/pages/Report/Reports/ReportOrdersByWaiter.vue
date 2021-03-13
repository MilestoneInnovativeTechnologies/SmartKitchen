<template>
  <q-page padding>
    <ReportCard title="Tokens By Waiter" :head="head" index :table="table" :center="['Tokens']" :right="['Amount','Payable']" :foot="foot" />
  </q-page>
</template>

<script>
import ReportCard from "pages/Report/ReportCard";
import {is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportOrdersByWaiter",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Tokens By Waiter',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    token_amounts(){ return _(this.bills).filter(({ progress }) => progress !== 'Cancelled').mapKeys('token.id').mapValues(({ amount,payable }) => _.zipObject(['amount','payable'],[_.toNumber(amount),_.toNumber(payable)])).value() },
    waiter_tokens(){ return _(this.tokens).filter(({ date,progress,waiter }) => progress !== 'Cancelled' && waiter && is_between(date,this.range.from,this.range.to)).groupBy('waiter.name').mapValues(tokens => _.map(tokens,({id}) => _.get(this.token_amounts,id,{ amount:0,payable:0 }))).value() },
    table(){
      return _.map(this.waiter_tokens,(tokens,Waiter) => Object(
        { Waiter,Tokens:_.size(tokens),Amount:precision(_.sumBy(tokens,'amount')),Payable:precision(_.sumBy(tokens,'payable')) }
        ))
    },
    foot(){
      let Ams = _.sumBy(this.table,({ Amount }) => _.toNumber(Amount)), Pys = _.sumBy(this.table,({ Payable }) => _.toNumber(Payable));
      return _.zipObject(['Total Tokens','Total Amount','Total Payable','Discount/Round'],[_.sumBy(this.table,'Tokens'),precision(Ams),precision(Pys),precision(Ams-Pys)]) }
  }
}
</script>
