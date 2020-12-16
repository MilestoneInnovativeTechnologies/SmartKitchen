<template>
  <q-card>
    <q-card-section class="bg-purple-2 q-pa-xs"></q-card-section>
    <q-card-section class="">
      <div class="text-h6">Orders</div>
      <div class="text-subtitle2">Today Total: {{ total }}</div>
    </q-card-section>
    <q-list dense>
      <q-item v-for="status in d_status" :key="'order-waiter-summary-status-' + status">
        <q-item-section>{{ status }}</q-item-section>
        <q-item-section side>{{ orderOfStatus(status) }}</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "OrderWaiterSummary",
  data(){ return {
    d_status: ['New','Processing','Completed','Billed','Cancelled']
  } },
  computed: {
    orders(){ return this.$store.getters['tokens/today'] },
    total(){ return _.size(this.orders) }
  },
  methods: {
    orderOfStatus(status){ return _.sumBy(_.values(this.orders),({ progress }) => _.toSafeInteger(status === progress)) }
  }
}
</script>
