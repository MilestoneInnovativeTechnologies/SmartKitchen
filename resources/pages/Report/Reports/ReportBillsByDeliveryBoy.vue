<template>
  <q-page padding>
    <ReportCard v-if="delivery_boy" title="Bills By Delivery Boy" :head="head" index :table="table" :foot="foot" :center="['Token/Bill','Items']" :right="['Amount','Discount','Payable','Paid','Balance']" />
    <div v-else class="text-center">Select Delivery Boy</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {extract_date, is_between, precision, range, time, to_format, to_html} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {bill_tax, bill_tax_details, bill_taxable} from "assets/module_helpers";

export default {
  name: "ReportBillsByDeliveryBoy",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, delivery_boy(){ return this.$store.state.public.delivery_boy },
    head(){ return _.zipObject(['Delivery Boy','Start Date','End Date'],[_.get(this.delivery_boy,'name'),to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    range_bills(){ return _.filter(this.bills,({ progress,date }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)) },
    user_bills(){ return _(this.range_bills).filter(({ user }) => this.delivery_boy.id === _.toInteger(_.get(user,'id',user))).sortBy(({ date }) => extract_date(date).getTime()).value() },
    table(){ return _(this.user_bills).map(({ id,date,token,customer,amount,discount,payable,paid }) => _.zipObject(['Time','Token/Bill','Customer','Items','Amount','Discount','Payable','Paid','Balance'],[
      time(date),`${token.id}/${id}`,_.get(customer,'name'),_.size(token.items),amount,discount,payable,paid,payable-paid
    ])).value() },
    foot(){ return _(['Bills','Amount','Discount','Payable','Paid','Balance']).mapKeys(key => 'Total ' + key).mapValues((key,idx) => idx === 'Total Bills' ? _.size(this.user_bills) : precision(_.sumBy(this.table,rec => _.toNumber(rec[key])))).value() },
  }
}
function total(bills,key){ return _.sumBy(bills,bill => _.toNumber(_.get(bill,key))) }
</script>
