<template>
  <q-page padding>
    <ReportCard title="Tax Details" :head="head" index :table="table" :right="['Amount']" />
  </q-page>
</template>

<script>
import ReportCard from "pages/Report/ReportCard";
import {is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {bill_tax_details} from "assets/module_helpers";

export default {
  name: "PageReportTaxDetails",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Tax Details',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    range_bills(){ return _.filter(this.bills,({ progress,date }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)) },
    taxes(){ return _.uniq(_.flatMap(this.$store.state.tax.data,({ contents,status }) => status === 'Active' ? _.map(contents,'name') : [])) },
    table(){
      let data = Object.assign({},_(_.cloneDeep(this.taxes)).mapKeys(val => val).mapValues(val => 0).value(),bill_tax_details({ contents:_.flatMap(this.range_bills,'contents') }));
      return _.map(data,(Amount,Tax) => Object({ Tax,Amount:precision(Amount) }))
    }
  }
}
</script>
