<template>
  <q-page padding class="q-gutter-y-sm">
    <OnlineOrdersPendingList color="primary" title="Pending Confirmation" />
    <OnlineOrdersConfirmed title="Confirmed" color="primary" />
  </q-page>
</template>

<script>
import OnlineOrdersPendingList from "components/Order/OnlineOrdersPendingList";
import OnlineOrdersConfirmed from "components/Order/OnlineOrdersConfirmed";
export default {
  name: 'PageOnlineMenuOrders',
  components: {OnlineOrdersConfirmed, OnlineOrdersPendingList},
}
</script>
