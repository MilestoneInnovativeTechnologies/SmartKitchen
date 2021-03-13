<template>
  <q-card class="q-pa-none">
    <q-card-section class="bg-grey-2 row justify-between text-bold"><div>Acceptable Token Items</div><div v-if="items.length">{{ items.length }}</div></q-card-section>
    <q-list v-if="items.length" separator>
      <q-item v-for="(item,idx) in items" :key="hKey(item,idx)">
        <q-item-section avatar><q-badge :label="item.token" color="grey" class="q-py-xs shadow-2" /></q-item-section>
        <q-item-section>
          <q-item-label><span class="text-weight-bolder">{{ item.quantity }}</span> x {{ item.iName }}</q-item-label>
          <q-item-label caption :class="kColor(item)">{{ item.kName }}</q-item-label>
          <q-item-label caption>Stock: {{ item.stock }}</q-item-label>
        </q-item-section>
        <q-item-section side><q-btn icon="reply_all" style="transform: rotateY(180deg)" round color="positive" @click="accept(item)" /></q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="center" v-else>No Items</q-card-actions>
    <q-inner-loading v-if="loading" :showing="true"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import {attention, h_key} from "assets/helpers";

export default {
  name: "KitchenItemAcceptable",
  data(){ return {
    Colors: ['accent','info','deep-purple-10','red-10','indigo-10','cyan-5','green-6','teal-5'],
    kitchens: [], loading: false,
  } },
  computed: {
    ...mapState({
      kItems: function({ kitchens:{ assign,items } }){ return _(_.pick(items,assign)).flatMap().groupBy('item').mapValues(this.iGroup).value() },
      tItems: function({ tokens:{ items } }){ return _(items).flatMap().filter(['progress','New']).value() },
      IK: function(store){ return _.mapValues({ kitchen:'kitchens',item:'items' },(s) => _.mapValues(store[s].data,'name')) }
    }),
    items(){ return _.flatMap(this.tItems,({ id,item,quantity,token }) => _.has(this.kItems,item) ? _.map(this.kItems[item],(ki) => Object.assign({},ki,{ id,token,quantity })) : []) },
  },
  methods: {
    iGroup(iAry){ return _(iAry).map(({ item,kitchen,stock }) => _.zipObject(['item','kitchen','stock','iName','kName'],[item,kitchen,stock,_.get(this.IK,['item',item]),_.get(this.IK,['kitchen',kitchen])])).value() },
    hKey({ item,kitchen },idx){ return h_key('kitchen','item','acceptable',idx,'kitchen',kitchen,'item',item) },
    kColor({ kitchen }){ return this.kitchens.includes(kitchen) ? ('text-'+this.Colors[this.kitchens.indexOf(kitchen)]) : this.kColor({ kitchen,add:this.kitchens.push(kitchen) }) },
    accept({ id,kitchen }){ this.loading = true; post('token','accept',{ id,kitchen }).then(() => this.loading = false) },
  },
  watch: {
    items(Nw,Ol){ if(!Ol || Nw.length > Ol.length) attention() }
  }
}
</script>
