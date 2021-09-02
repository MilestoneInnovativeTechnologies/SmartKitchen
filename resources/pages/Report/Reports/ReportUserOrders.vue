<template>
  <q-page padding>
    <ReportCard v-if="waiter" title="User Tokens" :head="head" index :table="table" :right="['Amount']" :foot="foot" />
    <div v-else class="text-center text-bold">Select a User</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_date_same, precision, time, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportWaiterOrders",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' }, waiter(){ return this.$store.state.public.user },
    head(){ return _.zipObject(['Report','User','Date'],['User Tokens',this.waiter.name,to_format('ddd - Do MMM',this.date)]) },
    token_amounts(){ return _(this.bills).filter(({ progress }) => progress !== 'Cancelled').mapKeys('token.id').mapValues(({ amount,payable }) => _.zipObject(['amount','payable'],[_.toNumber(amount),_.toNumber(payable)])).value() },
    date_tokens(){ return _(this.tokens).filter(({ progress,date,user }) => user === this.waiter.id && progress !== 'Cancelled' && is_date_same(date,this.date,'day')).value() },
    table(){ return _(this.date_tokens).map(({ date,id,customer,progress }) => _.zipObject(['Time','Token','Customer','Progress','Amount'],[
      time(date),id,customer ? customer.name : '-',progress,precision(_.get(this.token_amounts,[id,'amount'],0))
    ])).value() },
    foot(){ return Object.assign({},_.countBy(this.table,({ Progress }) => Progress + ' Tokens'),_.zipObject(['Tokens','Amount'],[_.size(this.table),precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount)))])) }
  }
}
</script>
