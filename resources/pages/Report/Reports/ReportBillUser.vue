<template>
  <q-page padding>
    <ReportCard v-if="user" title="Bill By User" :head="head" index :table="table" :foot="foot" :center="['Token/Bill','Items']" :right="['Amount','Discount','Payable','Paid','Balance']" />
    <div v-else class="text-center">Select User</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, is_date_same, time, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillUser",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' }, user(){ return this.$store.state.public.user },
    head(){ return _.zipObject(['Report','Date'],['Bills By ' + this.user.name,to_format('ddd - Do MMM',this.date)]) },
    date_bills(){ return _(this.bills).filter(({ date,progress }) => progress !== 'Cancelled' && is_date_same(date,this.date,'day')).value() },
    user_bills(){ return _(this.date_bills).filter(({ user }) => user.id === this.user.id).sortBy(({ date }) => extract_date(date).getTime()).value() },
    table(){ return _(this.user_bills).map(({ id,date,token,amount,discount,payable,paid }) => _.zipObject(['Time','Token/Bill','Type','Items','Amount','Discount','Payable','Paid','Balance'],[
      time(date),`${token.id}/${id}`,token.type,_.size(token.items),amount,discount,payable,paid,payable-paid
    ])).value() },
    foot(){ return _.zipObject(['Bills','Items','Total Payable','Total Paid','Total Balance'],[
      _.size(this.user_bills),_.sumBy(this.table,'Items'),_.sumBy(this.table,'Payable'),_.sumBy(this.table,'Paid'),_.sumBy(this.table,'Balance')
    ]) },
  }
}
function total(bills,key){ return _.sumBy(bills,bill => _.toNumber(_.get(bill,key))) }
</script>
