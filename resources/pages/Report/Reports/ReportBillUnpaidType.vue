<template>
  <q-page padding>
    <ReportCard v-if="type" title="Unpaid Bills by Type" :head="head" index :table="table" :foot="foot" :center="['Token/Bill']" :right="['Bill Amount','Paid Amount','Balance']" />
    <div v-else class="text-center">Select Order Type</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, human_date, is_between, is_date_same, precision, range, time, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "ReportBillUnpaidType",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, type(){ return this.$store.state.public.sale_type },
    head(){ return _.zipObject(['Report','Order Type','Date From','Date To'],['Unpaid Bills',this.type,to_format('ddd - Do MMM hh:mm A',this.range.from),to_format('ddd - Do MMM hh:mm A',this.range.to)]) },
    date_type_bills(){ return _(this.bills).filter(({ progress,token,date }) => progress === 'Pending' && _.get(token,'type') === this.type && is_between(date,this.range.from,this.range.to)).value() },
    table(){ return _(this.date_type_bills).map(({ id,date,token,customer,amount,discount,payable }) => _.zipObject(['ID','Date','Token','Customer','Amount','Discount','Payable'],[
      id,human_date(date,true),_.get(token,'id'),_.get(customer,'name'),precision(amount),precision(discount),precision(payable)
    ])).value() },
    foot(){ return _.zipObject(['Bills','Amount'],[
      _.size(this.table),precision(_.sumBy(this.date_type_bills,'payable')),
    ]) },
  }
}
</script>
