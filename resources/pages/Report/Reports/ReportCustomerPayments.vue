<template>
  <q-page padding>
    <ReportCard v-if="customer" title="Customer Payments" :head="head" :table="table" :foot="foot" index :center="['Bill/Token']" :right="['Amount']" />
    <div v-else class="text-center text-bold">Please select a customer</div>
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, human_date, range, to_format, precision} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageReportCustomerPayments",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) }, customer(){ return _.get(this.$store.state,['public','customer']) },
    head(){ return _.zipObject(['Customer','Start Date','End Date','Total Bills','Total Payments'],[this.customer.name,to_format('DD/MM/YYYY hh:mm A',this.range.from),to_format('DD/MM/YYYY hh:mm A',this.range.to),_.size(this.my_bills),_.size(this.payments)]) },
    my_bills(){ return _.keyBy(_.filter(this.bills,({ date,customer }) => is_between(date,this.range.from,this.range.to) && _.get(this.customer,'id') === _.get(customer,'id')),'id') },
    payments(){ return _(this.my_bills).flatMap('payments').filter({ status:'Active' }).sortBy(({ date }) => new Date(date)).value() },
    table(){ return _(this.payments).map(payment => _.zipObject(['Date','Mode','Bill/Token','Type','Amount'],
      [human_date(payment.date,true),payment.type,payment.bill+'/'+_.get(this.my_bills,[payment.bill,'token','id']),_.get(this.my_bills,[payment.bill,'token','type']),precision(payment.amount)]
    )).value() },
    foot(){ return { ...(_(this.payments).groupBy('type').mapValues(payments => precision(_.sumBy(payments,payment => _.toNumber(payment.amount)))).value()),Amount:precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount))) } },
  },
  methods: {

  }
}
</script>
