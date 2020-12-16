<template>
  <q-card>
    <CardImageTitle :image="src" :title="name" />
    <q-card-actions class="q-px-md">
      Users: {{ users.length }} <q-space /> <q-btn icon="add_box" color="primary" flat @click="add_mode = true" />
    </q-card-actions>
    <q-separator/>
    <q-list separator>
      <q-item class="text-bold">
        <q-item-section><q-item-label>Item</q-item-label></q-item-section>
        <q-item-section><q-item-label>Stock</q-item-label></q-item-section>
        <q-item-section><q-item-label>Duration</q-item-label></q-item-section>
        <q-item-section><q-item-label>Auto</q-item-label></q-item-section>
        <q-item-section side>&nbsp;</q-item-section>
      </q-item>
      <KitchenItemsDisplayItemRow v-for="my_item in my_items" :key="hKey(my_item)" v-bind="my_item" :name="item(my_item).name" />
    </q-list>
    <q-dialog persistent v-model="add_mode"><KitchenItemAdd style="width: 700px; max-width: 60vw;" :kitchen="kitchen" @close="add_mode = false" /></q-dialog>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import CardImageTitle from "components/CardImageTitle";
import {h_key} from "assets/helpers";
import KitchenItemsDisplayItemRow from "components/Kitchen/KitchenItemsDisplayItemRow";
import KitchenItemAdd from "components/Kitchen/KitchenItemAdd";
export default {
  name: "KitchenItemsDisplay",
  props: ['kitchen'],
  data(){ return {
    add_mode: false,
    src: 'https://cdn.quasar.dev/img/parallax2.jpg'
  } },
  components: {KitchenItemAdd, KitchenItemsDisplayItemRow, CardImageTitle},
  computed: {
    ...mapState('kitchens',{ all:'data',k_items:'items',status:'status' }),
    ...mapState('items',{ items:'data' }),
    name(){ return _.get(this.all,[_.toSafeInteger(this.kitchen),'name']) },
    my_items(){ return _.get(this.k_items,_.toSafeInteger(this.kitchen)) },
    users(){ return _.get(this.status,[_.toSafeInteger(this.kitchen),'users']) }
  },
  methods: {
    item({ item }){ return _.get(this.items,_.toSafeInteger(item),{}) },
    hKey({id,item}){ return h_key('kitchen',this.kitchen,'items',id,'item',item) }
  }
}
</script>
