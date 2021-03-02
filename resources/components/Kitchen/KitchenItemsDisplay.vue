<template>
  <q-card>
    <q-card-section class="bg-grey-2">
      <div class="text-h6">{{ name }}</div>
    </q-card-section>
    <q-card-actions class="q-px-md">
      Users: {{ users.length }} <q-space /> <q-btn icon="add_box" color="primary" flat @click="add_mode = true" />
    </q-card-actions>
    <q-separator/>
    <q-list separator>
      <q-item class="text-bold">
        <q-item-section><q-item-label>Item</q-item-label></q-item-section>
        <q-item-section><q-item-label>Stock</q-item-label></q-item-section>
        <q-item-section><q-item-label>Duration</q-item-label></q-item-section>
        <q-item-section><q-item-label>Auto Process</q-item-label></q-item-section>
        <q-item-section><q-item-label>Auto Complete</q-item-label></q-item-section>
        <q-item-section side>&nbsp;</q-item-section>
      </q-item>
      <q-item class="text-bold">
        <q-item-section><FilterInputText label="Filter Items" @text="filter = $event" /></q-item-section>
      </q-item>
      <KitchenItemsDisplayItemRow v-for="k_item in filtered" :key="hKey(k_item)" v-bind="k_item" :name="item(k_item).name" :temp="filtered" />
    </q-list>
    <q-dialog persistent v-model="add_mode"><KitchenItemAdd style="width: 700px; max-width: 60vw;" :kitchen="kitchen" @close="add_mode = false" /></q-dialog>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import CardImageTitle from "components/CardImageTitle";
import {h_key, matches} from "assets/helpers";
import KitchenItemsDisplayItemRow from "components/Kitchen/KitchenItemsDisplayItemRow";
import KitchenItemAdd from "components/Kitchen/KitchenItemAdd";
import FilterInputText from "components/FilterInputText";
export default {
  name: "KitchenItemsDisplay",
  props: ['kitchen'],
  data(){ return {
    add_mode: false, filter: '',
  } },
  components: {FilterInputText, KitchenItemAdd, KitchenItemsDisplayItemRow, CardImageTitle},
  computed: {
    kid(){ return _.toInteger(this.kitchen) },
    ...mapState('kitchens',{
      name: function({ data }){ return _.get(data,[this.kid,'name']) },
      k_items: function({ items }){ return _.get(items,this.kid) },
      users: function({ status }){ return _.get(status,[this.kid,'users'],[]) },
    }),
    ...mapState('items',{ items:'data' }),
    filtered(){ return this.filter ? _.filter(this.k_items,this.match) : this.k_items }
  },
  methods: {
    item({ item }){ return _.get(this.items,_.toSafeInteger(item),{}) },
    hKey({id,item}){ return h_key('kitchen',this.kitchen,'items',id,'item',item) },
    match({ item }){ return matches(this.items[item],['id','name','detail'],this.filter) }
  }
}
</script>
