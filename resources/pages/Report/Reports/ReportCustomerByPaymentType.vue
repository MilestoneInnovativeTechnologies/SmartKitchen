<template>
  <q-page padding>
    <ReportCard v-if="customer && mode" title="Customer Payments by Mode" :head="head" :table="table" :foot="foot" index :center="['Bill/Token']" :right="['Bill Amount','Paid Amount','Bill Balance']" />
    <div v-else class="text-center text-bold">Please select Customer and Payment Mode</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, human_date, range, to_format, precision} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportCustomerByPaymentType",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, customer(){ return _.get(this.$store.state,['public','customer']) }, mode(){ return _.get(this.$store.state,['public','payment_type']) },
    head(){ return _.zipObject(['Customer','Mode','Start Date','End Date','Total Bills',this.mode +' Payments'],[this.customer.name,this.mode,to_format('DD/MM/YYYY hh:mm A',this.range.from),to_format('DD/MM/YYYY hh:mm A',this.range.to),_.size(this.my_bills),_.size(this.payments)]) },
    my_bills(){ return _.keyBy(_.filter(this.bills,({ date,customer }) => is_between(date,this.range.from,this.range.to) && _.get(this.customer,'id') === _.get(customer,'id')),'id') },
    payments(){ return _(this.my_bills).flatMap('payments').filter({type:this.mode,status:'Active'}).sortBy(({ date }) => new Date(date)).value() },
    table(){ return _(this.payments).map(({ date,bill,amount }) => _.zipObject(['Date','Bill/Token','Type','Bill Amount','Status','Paid Amount','Bill Balance'],
      [human_date(date,true),bill+'/'+this.bd(bill,['token','id']),this.bd(bill,['token','type']),precision(this.bd(bill,'amount')),this.bd(bill,'progress'),precision(amount),this.balance(bill)]
    )).value() },
    foot(){ return { ...this.group_sum('Type','Paid Amount'),Total:precision(_.sumBy(this.table,rec => _.toNumber(rec['Paid Amount']))) } },
  },
  methods: {
    bd(b_id,key){ return _.get(_.get(this.my_bills,b_id),key) },
    balance(b_id) { return precision(this.bd(b_id,'payable')-this.bd(b_id,'paid')) },
    group_sum(g_key,s_key){ return _(this.table).groupBy(g_key).mapValues(recs => precision(_.sumBy(recs, rec => _.toNumber(rec[s_key])))).value() }
  }
}
</script>
