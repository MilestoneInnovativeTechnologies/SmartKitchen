<template>
  <q-page padding>
    <ReportCard title="Unpaid Bills" :head="head" index :table="table" :foot="foot" :center="['Token']" :right="['Amount']" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, human_date, is_between, is_date_same, precision, range, time, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillUnpaid",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    date(){ return this.$store.state.public.date + ' 00:00:00' },
    head(){ return _.zipObject(['Report','Date'],['Unpaid Bills',to_format('ddd - Do MMM',this.date)]) },
    date_unpaid_bills(){ return _(this.bills).filter(({ progress,date }) => progress === 'Pending' && is_date_same(date,this.date,'day')).value() },
    table(){ return _(this.date_unpaid_bills).map(({ id,date,token,customer,payable }) => _.zipObject(['ID','Time','Token','Customer','Amount'],[
      id,time(date),_.get(token,'id'),_.get(customer,'name'),precision(payable)
    ])).value() },
    foot(){ return Object.assign({},{ 'Total Bills':_.size(this.table) },_.mapValues(_.groupBy(this.date_unpaid_bills,'token.type'),sumCount),{ 'Total Amount': precision(_.sumBy(this.date_unpaid_bills,'payable')) }) },
  }
}
function sumCount(bills){ return precision(_.sumBy(bills,'payable')) + ' (' + _.size(bills) + ')' }
</script>
