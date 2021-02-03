<template>
  <q-page padding class="q-gutter-y-sm">
    <OrderWaiterSummary />
    <OrderWaiterServable />
    <OrderOngoingTables />
  </q-page>
</template>

<script>
import OrderWaiterSummary from "components/Order/OrderWaiterSummary";
import OrderWaiterServable from "components/Order/OrderWaiterServable";
import DigitMetric from "components/Metric/DigitMetric";
import OrderOngoingTables from "components/Order/OrderOngoingTables";
export default {
  name: 'PageWaiterIndex',
  components: {OrderOngoingTables, DigitMetric, OrderWaiterServable, OrderWaiterSummary},
  data(){ return { token: new URLSearchParams(document.location.search.substring(1)).get('token') } },
}
</script>
