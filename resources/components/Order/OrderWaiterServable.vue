<template>
  <q-card>
    <q-card-section class="row justify-between text-bold bg-green text-white"><div>Order Items to Serve</div><div v-if="servable.length > 0">{{ servable.length }}</div></q-card-section>
    <q-list separator bordered v-if="servable.length">
      <q-item v-for="item in servable" :key="'order-waiter-servable-item-' + item.id">
        <q-item-section>
          <q-item-label>{{ item.quantity }} X {{ itemName(item.item) }}</q-item-label>
          <q-item-label caption>Kitchen: {{ kitchenName(item.kitchen) }}</q-item-label>
          <q-item-label caption>Seating: {{ SeatingName(item.token) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>{{ itemTiming(item.progress_timing) }} ago</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="how_to_reg" color="positive" round @click="served(item)" dense />
        </q-item-section>
        <q-inner-loading v-if="serving.includes(item.id)" :showing="true"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
      </q-item>
    </q-list>
    <q-card-section v-else class="text-center">NO ITEMS RIGHT NOW..</q-card-section>
  </q-card>
</template>

<script>
import {attention} from "assets/helpers";

export default {
  name: "OrderWaiterServable",
  data(){ return {
    d_status: ['New','Processing','Completed','Billed','Cancelled'],
    serving: [],
  } },
  computed: {
    orders(){ return _(this.$store.state.tokens.data).filter({ type:'Dining',progress:'Processing' }).mapKeys(({ id }) => parseInt(id)).value() },
    items(){ return _.flatMap(_.pick(this.$store.state.tokens.items,_.keys(this.orders))) },
    servable(){ return _.filter(this.items,['progress','Completed']) },
  },
  methods: {
    itemName(id){ return _.get(this.$store.state.items.data,[id,'name']) },
    kitchenName(id){ return _.get(this.$store.state.kitchens.data,[id,'name']) },
    SeatingName(token){ return _.get(this.$store.state.seating.data,[_.get(this.orders,[token,'seating']),'name']) },
    since(timings){ let s_time = _.get(_.last(timings),'time'), n_time = _.toInteger(new Date().getTime()/1000); return n_time - s_time; },
    itemTiming(timings){ let s = this.since(timings); return (s < 60) ? (s + ' seconds') : ((s < 3600) ? (_.toInteger(s/60) + ' minutes') : (_.toInteger(s/3600) + ' hours')) },
    served({ id }){ this.serving.push(id); post('token','served',{ id }).then(() => this.serving = _.difference(this.serving,[id])) },
  },
  watch: {
    servable(Nw,Ol){ if(!Ol || Nw.length > Ol.length) attention() }
  }
}
</script>
