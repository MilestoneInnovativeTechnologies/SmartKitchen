<template>
  <q-card class="q-pa-none">
    <q-card-section class="bg-grey-2"><div class="text-bold">Least Stock Items</div></q-card-section>
    <q-list v-if="sorted.length" dense separator>
      <q-item v-for="(data,idx) in sorted" :key="'kils-' + idx">
        <q-item-section avatar>{{ idx+1 }}</q-item-section>
        <q-item-section><q-item-label>{{ data.item }}</q-item-label><q-item-label caption>{{ data.kitchen }}</q-item-label></q-item-section>
        <q-item-section side class="text-bold" :class="{ 'text-warning':data.stock>0,'text-negative':data.stock<1 }">{{ data.stock }}</q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="center" v-else>No items with less stock</q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "KitchenItemLeastStock",
  computed: {
    ...mapState({
      kitchens: ({ kitchens: {data, assign} }) => _(assign).mapKeys(kid => kid).mapValues(kid => data[kid]).value(),
      items: function({ kitchens: {items, assign}, items: { data } }){ return _(_.pick(items,assign)).flatMap().filter(({ stock }) => stock < 8).map(ki => _.zipObject(['item','kitchen','stock'],[data[ki.item].name,this.kitchens[ki.kitchen].name,ki.stock])).value() },
    }),
    sorted(){ return _.sortBy(this.items,'stock') }
  }
}
</script>
