<template>
  <q-page padding>
    <ReportCard title="Bill Summary with Tax" :head="head" :table="table" :right="['Payable','Taxable','Tax']" :foot="foot" index />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {bill_tax, bill_taxable} from "assets/module_helpers";

export default {
  name: "PageBillSummaryTax",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Bill Summary with Tax',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    range_bills(){ return _.filter(this.bills,({ progress,date }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)) },
    table(){ return _(this.range_bills).map(({ id,date,contents,payable }) => _.zipObject(['Date','Bill ID','Payable','Taxable','Tax'],[
      to_format('Do hh:mm a',date),id,precision(payable),precision(bill_taxable({ contents })),precision(bill_tax({ contents }))
    ])).value() },
    foot(){ return _(['Payable','Taxable','Tax']).mapKeys(key => 'Total ' + key).mapValues(key => precision(_.sumBy(this.table,rec => _.toNumber(rec[key])))).value() },
  }
}
</script>
