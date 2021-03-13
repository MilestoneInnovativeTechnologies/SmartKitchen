<template>
  <q-page padding>
    <ReportCard title="Bill Summary by Tax Nature" :head="head" index :table="table" :html="['Tax']" :right="['Payable','Total Tax']" />
  </q-page>
</template>

<script>
import ReportCard from "pages/Report/ReportCard";
import {is_between, precision, range, to_format, to_html} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {bill_tax, bill_tax_details, bill_taxable} from "assets/module_helpers";

export default {
  name: "PageReportBillSummaryTaxNature",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, nature(){ return this.$store.state.public.nature },
    head(){ return _.zipObject(['Report','Tax Nature','Start Date','End Date'],['Bill Summary by Tax Nature',this.nature,to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    range_bills(){ return _.filter(this.bills,({ progress,date,nature }) => progress !== 'Cancelled' && nature === this.nature && is_between(date,this.range.from,this.range.to)) },
    table(){ return _(this.range_bills).map(({ id,date,contents,payable,customer:{ name } }) => _.zipObject(['Date','Bill ID','Customer','Payable','Tax','Total Tax'],[
      to_format('Do hh:mm a',date),id,name,precision(payable),to_html(_.mapValues(bill_tax_details({ contents }),val => precision(val,2))),precision(bill_tax({ contents }))
    ])).value() },
    foot(){ return _(['Payable','Taxable','Tax']).mapKeys(key => 'Total ' + key).mapValues(key => precision(_.sumBy(this.table,rec => _.toNumber(rec[key])))).value() },
  }
}
</script>
