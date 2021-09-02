<template>
  <q-page padding>
    <ReportCard title="Bill Details - Tax" :head="head" index :table="table" :html="['Tax Detail']" :right="['Bill Amount','Tax','Paid']" :foot="foot" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, precision, range, to_format, to_html} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {bill_tax, bill_tax_details} from "assets/module_helpers";

export default {
  name: "PageReportTaxBillDetail",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Report','Start Date','End Date'],['Bill Details - Tax',to_format('ddd DD/MMM hh:mm',this.range.from),to_format('ddd DD/MMM hh:mm',this.range.to)]) },
    range_bills(){ return _.filter(this.bills,({ progress,date }) => progress !== 'Cancelled' && is_between(date,this.range.from,this.range.to)) },
    table(){ return _(this.range_bills).map(({ id,contents,payable,nature,paid }) => _.zipObject(['Bill ID','Nature','Bill Amount','Tax','Tax Detail','Paid'],[
      id,nature,precision(payable),precision(bill_tax({ contents })),to_html(_.mapValues(bill_tax_details({ contents }),val => precision(val,2))),precision(paid)
    ])).value() },
    foot(){
      let details = {}
      _.forEach(this.range_bills,function(bill){
        _.forEach(bill_tax_details(bill),function(amount,name){
          if(!_.has(details,name)) Object.assign(details,{ [name]:0 })
          details[name] += _.toNumber(amount);
        })
      })
      return _.mapValues(details,amount => precision(amount))
    },
  }
}
</script>
