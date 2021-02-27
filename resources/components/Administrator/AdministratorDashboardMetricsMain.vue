<template>
  <div class="row q-col-gutter-xs">
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="customers.length" bg="teal" text="white" title="Total Customers" icon="supervised_user_circle" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="tokens.length" bg="blue" text="white" title="Tokens Today" icon="description" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="payments" bg="lime" text="white" title="Today Payments" icon="account_balance_wallet" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="least.length" bg="orange" text="white" title="Least Stock" icon="trending_down" /></div>
  </div>
</template>

<script>
import DigitMetric from "components/Metric/DigitMetric";
import {is_today} from "assets/helpers";
export default {
  name: "AdministratorDashboardMetricsMain",
  components: {DigitMetric},
  computed: {
    customers(){ return Object.values(this.$store.state.customers.data) },
    tokens(){ return _.filter(this.$store.state.tokens.data,({ date }) => is_today(date)) },
    payments(){ return _(this.$store.state.payments.data).filter(({ date }) => is_today(date)).sumBy(({ amount }) => _.toNumber(amount)) },
    least(){ return _(this.$store.state.kitchens.items).flatMap().filter(({ stock }) => stock < 5).value() },
  }
}
</script>
