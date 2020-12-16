<template>
  <q-page padding class="q-gutter-y-sm">
    <OrderWaiterSummary class="q-mx-auto" style="max-width: 360px; width: 90vw" />
    <OrderWaiterServable class="q-mx-auto" style="max-width: 360px; width: 90vw" />
  </q-page>
</template>

<script>
import OrderWaiterSummary from "components/Order/OrderWaiterSummary";
import OrderWaiterServable from "components/Order/OrderWaiterServable";
export default {
  name: 'PageWaiterIndex',
  components: {OrderWaiterServable, OrderWaiterSummary},
  data(){ return { token: new URLSearchParams(document.location.search.substring(1)).get('token') } },
}
</script>
