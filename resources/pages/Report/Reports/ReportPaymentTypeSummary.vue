<template>
  <q-page padding>
    <ReportCard title="Payment Type Summary" :head="head" :table="table" :foot="foot" :center="['Bills','Payments']" right="Amount" />
  </q-page>
</template>

<script>
import ReportCard from "components/Report/ReportCard";
import {is_between, precision, range, to_format} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import {PaymentsTypes} from "assets/assets";

export default {
  name: "PageReportPaymentTypeSummary",
  components: {ReportCard},
  mixins: [Bills],
  computed: {
    range(){ return range(this.$store.state.public.range) },
    head(){ return _.zipObject(['Start Date','End Date','Total Bills','Paid Bills'],[to_format('DD/MM/YYYY hh:mm A',this.range.from),to_format('DD/MM/YYYY hh:mm A',this.range.to),this.range_bills.length,this.paid_bills.length]) },
    range_bills(){ return _.filter(this.bills,({ date }) => is_between(date,this.range.from,this.range.to)) },
    paid_bills(){ return _.filter(this.range_bills,({ progress }) => ['Paid','Partial'].includes(progress)) },
    payment_type_bills(){
      let ptb = _.zipObject(PaymentsTypes,Array.from(PaymentsTypes, () => []))
      _.forEach(this.paid_bills,bill => _.forEach(_.filter(bill.payments,['status','Active']),({ type }) => ptb[type].push(bill)))
      return ptb;
    },
    table(){ return _(PaymentsTypes).map(type => _.zipObject(['Type','Bills','Payments','Amount'],
      [type,this.payment_type_bills[type].length,this.payments(type).length,this.amount(type)]
    )).value() },
    foot(){ return { Payments:_.sumBy(this.table,'Payments'),Total:precision(_.sumBy(this.table,({ Amount }) => _.toNumber(Amount))) } },
  },
  methods: {
    payments(type){ return _.filter(_.flatMap(this.payment_type_bills[type],'payments'),payment => payment.type === type) },
    amount(type){ return precision(_.sumBy(this.payments(type),({ amount }) => _.toNumber(amount))) },
  }
}
</script>
