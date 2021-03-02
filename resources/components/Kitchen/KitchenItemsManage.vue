<template>
  <q-card>
    <q-card-section class="bg-grey-1 text-weight-bold">Add/Edit Kitchen Items</q-card-section>
    <q-list v-if="kitchen">
      <q-item class="text-weight-bold">
        <q-item-section><q-item-label>Item</q-item-label></q-item-section>
        <q-item-section><q-item-label>Stock</q-item-label></q-item-section>
        <q-item-section><q-item-label>Duration</q-item-label></q-item-section>
        <q-item-section><q-item-label>Auto Process</q-item-label></q-item-section>
        <q-item-section><q-item-label>Auto Complete</q-item-label></q-item-section>
        <q-item-section side><q-btn size="xs" icon="blank" flat color="positive" padding="xs" /></q-item-section>
      </q-item>
      <q-item>
        <q-item-section><q-item-label><ItemSelectDropDown dense outlined get="id" v-model="params.item"  option-label="name" /></q-item-label></q-item-section>
        <q-item-section><q-item-label><q-input dense outlined type="number" v-model.number="params.stock" /></q-item-label></q-item-section>
        <q-item-section><q-item-label><q-input dense outlined type="number" v-model.number="params.duration" label="in seconds" /></q-item-label></q-item-section>
        <q-item-section><q-item-label><q-select dense outlined :options="['No','Yes']" v-model="params.auto_process" /></q-item-label></q-item-section>
        <q-item-section><q-item-label><q-select dense outlined :options="['No','Yes']" v-model="params.auto_complete" /></q-item-label></q-item-section>
        <q-item-section side><q-btn size="xs" icon="add" color="positive" padding="xs" @click="add" /></q-item-section>
      </q-item>
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <q-item v-for="(item,iId,idx) in updates" :key="hKey(item,'u-row',idx)">
          <q-item-section><q-item-label>{{ itemName(item) }}</q-item-label></q-item-section>
          <q-item-section v-for="col in cols" :key="hKey(item,'col',col)"><q-item-label>{{ item[col] }}</q-item-label></q-item-section>
          <q-item-section side><q-btn size="xs" icon="delete_forever" color="negative" padding="xs" @click="remove(item,true)" /></q-item-section>
        </q-item>
        <q-item v-for="(item,idx) in items" :key="hKey(item,'row',idx)" v-if="!removes.includes(item.item)">
          <q-item-section><q-item-label>{{ itemName(item) }}</q-item-label></q-item-section>
          <q-item-section v-for="col in cols" :key="hKey(item,'col',col)"><q-item-label>{{ item[col] }}</q-item-label></q-item-section>
          <q-item-section side><q-btn size="xs" icon="delete_forever" color="negative" padding="xs" @click="remove(item)" /></q-item-section>
        </q-item>
      </transition-group>
    </q-list>
  </q-card>
</template>

<script>
import {h_key} from "assets/helpers";
import ItemSelectDropDown from "components/Item/ItemSelectDropDown";
const params = { item:null,stock:0,duration:60,auto_process:'No',auto_complete:'No' }

export default {
  name: "KitchenItemsManage",
  components: {ItemSelectDropDown},
  props: ['kitchen'],
  data(){ return {
    removes: [], updates: {},
    params: {},
    cols: ['stock','duration','auto_process','auto_complete']
  } },
  computed: {
    items(){ return _.get(this.$store.state.kitchens.items,this.kitchen,[]) }
  },
  methods: {
    hKey({ item },sec,detail){ return h_key('kim','kitchen',this.kitchen,'item',item,sec,detail) },
    itemName({ item }){ return _.get(this.$store.state.items.data,[item,'name']) },
    resetParams(){ _.forEach(params,(v,p) => this.$set(this.params,p,v)) },
    add(){ if(!this.params.item) return; this.$set(this.updates,this.params.item,_.clone(this.params)); this.resetParams() },
    remove({ item },upd){ this.removes.push(item); this.resetParams(); if(upd) delete this.updates[item] },
  },
  watch: {
    kitchen: { immediate: true, handler(){ this.resetParams(); this.updates = {}; this.removes = [] } },
    removes: { deep: true, immediate: true, handler(removes){ this.$emit('removes',removes) } },
    updates: { deep: true, immediate: true, handler(updates){ this.$emit('updates',updates) } },
  }
}
</script>
