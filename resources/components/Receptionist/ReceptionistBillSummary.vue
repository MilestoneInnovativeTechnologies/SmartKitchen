<template>
  <div class="row q-col-gutter-xs">
    <div class="col-xs-6 col-md-3"><DigitMetric :value="pending.length" bg="cyan" text="white" title="Pending Bills" icon="receipt" /></div>
    <div class="col-xs-6 col-md-3"><DigitMetric :value="pending_amount" bg="orange" text="white" title="Pending Amount" icon="request_quote" /></div>
    <div class="col-xs-6 col-md-3"><DigitMetric :value="paid.length" bg="lime" text="white" title="Paid Bills" icon="file_copy" /></div>
    <div class="col-xs-6 col-md-3"><DigitMetric :value="paid_amount" bg="green" text="white" title="Total Payments" icon="payments" /></div>
  </div>
</template>

<script>
import DigitMetric from "components/Metric/DigitMetric";
import Bills from "assets/mixins/Bills";
import {is_today} from "assets/helpers";
export default {
  name: "ReceptionistBillSummary",
  components: {DigitMetric},
  mixins: [Bills],
  computed: {
    today(){ return _(this.bills).filter(({ date }) => is_today(date)).value() },
    pending(){ return _(this.today).filter(['progress','Pending']).value() },
    pending_amount(){ return _.sumBy(this.pending,({ amount }) => _.toNumber(amount)) },
    paid(){ return _(this.today).filter(({ progress }) => ['Paid','Partial'].includes(progress)).value() },
    paid_amount(){ return _.sumBy(this.paid,({ amount }) => _.toNumber(amount)) },
  }
}
</script>
