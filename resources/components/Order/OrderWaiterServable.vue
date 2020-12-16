<template>
  <q-card>
    <q-card-section class="bg-lime-2 q-pa-xs"></q-card-section>
    <q-card-section>
      <div class="text-h6">Order Items to Serve</div>
      <div class="text-subtitle2">Total: {{ servable.length }}</div>
    </q-card-section>
    <q-list separator bordered>
      <q-item v-for="item in servable" :key="'order-waiter-servable-item-' + item.id">
        <q-item-section>
          <q-item-label>{{ item.quantity }} X {{ itemName(item.item) }}</q-item-label>
          <q-item-label caption>Kitchen: {{ kitchenName(item.kitchen) }}</q-item-label>
          <q-item-label caption>Seating: {{ SeatingName(item.token) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>{{ itemTiming(item.progress_timing) }} ago</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "OrderWaiterServable",
  data(){ return {
    d_status: ['New','Processing','Completed','Billed','Cancelled']
  } },
  computed: {
    orders(){ return this.$store.getters['tokens/today'] },
    items(){ return _.flatMap(_.pick(this.$store.state.tokens.items,_.keys(this.orders))) },
    servable(){ return _.filter(this.items,['progress','Completed']) },
  },
  methods: {
    itemName(id){ return _.get(this.$store.state.items.data,[id,'name']) },
    kitchenName(id){ return _.get(this.$store.state.kitchens.data,[id,'name']) },
    SeatingName(token){ return _.get(this.$store.state.seating.data,[_.get(this.orders,[token,'seating']),'name']) },
    since(timings){ let s_time = _.get(_.last(timings),'time'), n_time = _.toInteger(new Date().getTime()/1000); return n_time - s_time; },
    itemTiming(timings){ let s = this.since(timings); return (s < 60) ? (s + ' seconds') : ((s < 3600) ? (_.toInteger(s/60) + ' minutes') : (_.toInteger(s/3600) + ' hours')) },
  }
}
</script>
