<template>
  <q-page padding>
    <ReportCard v-if="user" title="Payments by User" :head="head" index :table="table" :foot="foot" :center="['Token/Bill']" :right="['Bill Amount','Paid Amount','Balance']" />
    <div v-else class="text-center">Select User</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, human_date, is_between, is_date_same, precision, range, time, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillUnpaidUser",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, user(){ return this.$store.state.public.user },
    head(){ return _.zipObject(['Report','User','Date From','Date To'],['Unpaid Bills',this.user.name,to_format('ddd - Do MMM hh:mm A',this.range.from),to_format('ddd - Do MMM hh:mm A',this.range.to)]) },
    date_user_bills(){ return _(this.bills).filter(({ progress,date,user }) => progress === 'Pending' && is_between(date,this.range.from,this.range.to) && user.id === this.user.id).value() },
    table(){ return _(this.date_user_bills).map(({ id,date,token,customer,amount,discount,payable }) => _.zipObject(['ID','Date','Token','Type','Customer','Amount','Discount','Payable'],[
      id,human_date(date,true),_.get(token,'id'),_.get(token,'type'),_.get(customer,'name'),precision(amount),precision(discount),precision(payable)
    ])).value() },
    foot(){ return _.zipObject(['Bills','Amount'],[
      _.size(this.table),precision(_.sumBy(this.date_user_bills,'payable')),
    ]) },
  }
}
</script>
