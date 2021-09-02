<template>
  <q-page padding>
    <ReportCard title="Bill Summary by User Type" :head="head" index :table="table" :foot="foot" :right="['Amount','Discount','Payable','Paid','Pending']" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, precision, range, to_format, to_html} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {bill_tax, bill_tax_details, bill_taxable} from "assets/module_helpers";

export default {
  name: "PageReportBillSummaryUserType",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, nature(){ return this.$store.state.public.nature }, user_role(){ return _(this.$store.state.users.data).mapValues('role').value() },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Bill Summary - User Type',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    range_bills(){ return _.filter(this.bills,({ progress,date }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)) },
    grouped_bills(){ return _.groupBy(this.range_bills,({ user }) => this.user_role[_.toInteger(_.get(user,'id',user))]) },
    table(){ return _(this.grouped_bills).map((bills,users) => _.zipObject(['Type','Bills','Amount','Discount','Payable','Paid','Pending'],[
      users,_.size(bills),total(bills,'amount'),total(bills,'discount'),total(bills,'payable'),total(bills,'paid'),total(bills,'payable')-total(bills,'paid')
    ])).value() },
    foot(){ return _(['Bills','Amount','Discount','Payable','Paid','Pending']).mapKeys(key => 'Total ' + key).mapValues((key,idx) => idx !== 'Total Bills' ? precision(_.sumBy(this.table,rec => _.toNumber(rec[key]))) : _.sumBy(this.table,rec => _.toNumber(rec[key]))).value() },
  }
}
function total(bills,key){ return _.sumBy(bills,bill => _.toNumber(_.get(bill,key))) }
</script>
