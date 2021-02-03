<template>
  <q-card>
    <q-card-section class="row justify-between text-bold bg-green text-white"><div>Servable Items</div><div v-if="items.length > 0">{{ items.length }}</div></q-card-section>
    <q-list separator bordered v-if="items.length">
      <q-item v-for="item in items" :key="'order-receptionist-servable-item-' + item.id">
        <q-item-section>
          <q-item-label>{{ item.quantity }} X {{ item.item ? item.item.name : '' }}</q-item-label>
          <q-item-label caption><q-icon name="outdoor_grill" /> {{ item.kitchen ? item.kitchen.name : '' }}</q-item-label>
          <q-item-label caption><q-icon name="event_seat" /> {{ SeatingName(item.token) }}</q-item-label>
          <q-item-label caption class="text-bold"><q-icon name="account_box" /> {{ item.user ? item.user.name : '' }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>{{ itemTiming(item.progress_timing) }} ago</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="how_to_reg" color="positive" round @click="served(item.id)" dense />
        </q-item-section>
        <q-inner-loading v-if="serving.includes(item.id)" :showing="true"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
      </q-item>
    </q-list>
    <q-card-section v-else class="text-center">NO ITEMS</q-card-section>
  </q-card>
</template>

<script>
import Tokens from "assets/mixins/Tokens";

export default {
  name: "ReceptionistServableItems",
  mixins: [Tokens],
  data(){ return {
    now: 0,
    serving: [],
  } },
  computed: {
    items(){ return _.flatMap(this.tokens,token => {
      if(token.type !== 'Dining') return [];
      return _.filter(token.items,['progress','Completed'])
    }) },
  },
  methods: {
    SeatingName(token){ return _.get(_.find(this.tokens,['id',token]),['seating','name']) },
    itemTiming(timings){ let s = this.now - _.get(_.last(timings),'time'); return (s < 60) ? (s + ' seconds') : ((s < 3600) ? (_.toInteger(s/60) + ' minutes') : (_.toInteger(s/3600) + ' hours')) },
    served(id){ this.serving.push(id); post('token','served',{ id }).then(() => this.serving = _.difference(this.serving,[id])) },
  },
  created() {
    setInterval(vm => vm.now = _.toInteger(new Date().getTime()/1000),1000,this)
  }
}
</script>
