<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Add Item to Kitchen</div><q-space />
      <q-btn icon="close" flat round dense @click="$emit('close',null)" />
    </q-card-section>
    <q-card-section class="q-gutter-xs q-pb-none">
      <q-select
        outlined dense use-input
        hide-selected fill-input
        input-debounce="0" v-model="item_obj"
        :options="item_options_unique" @filter="filter"
        label="Select Item"
        clearable
      />
      <q-input dense outlined type="number" label="Stock" v-model.number="params.stock"/>
      <q-input dense outlined type="number" label="Prepare Duration in Minutes" v-model.number="params.duration"/>
      <q-select dense outlined :options="['Yes','No']" label="Auto Process on Accept" v-model="params.auto_process" />
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-xs">
      <q-btn color="primary" label="Add Item" type="submit" @click.prevent="add" :loading="loading"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {options} from "assets/helpers";
import {mapState} from "vuex";

export default {
  name: "KitchenItemAdd",
  props: ['kitchen'],
  data(){ return {
    item_obj: null, item_options: [], loading: false,
    params: {
      item: null, stock: 1, duration: 0, auto_process: 'No', kitchen: null,
    }
  } },
  computed: {
    ...mapState({ items:({ items:{ data } }) => data,kitchen_items:({ kitchens: { items } }) => items }),
    my_kitchen_items(){ return _.map(this.kitchen_items[_.toSafeInteger(this.kitchen)],'item') },
    item_options_unique(){ return _.filter(this.item_options,({ id }) => !_.includes(this.my_kitchen_items,_.toSafeInteger(id))) }
  },
  methods: {
    filter(val, update) {
      update(() => {
        const needle = (val || '').toLowerCase();
        this.item_options = needle
          ? options(this.items,['name']).filter(v => _.values(v).join(' ').toLowerCase().indexOf(needle) > -1)
          : options(this.items,['name'])
      })
    },
    add(){
      this.loading = true; this.params.item = _.get(this.item_obj,'id',null);
      this.params.kitchen = this.kitchen;
      if(!this.params.kitchen || !this.params.item) return this.loading = false;
      post('kitchen','item',this.params).then(() => this.$emit('close')).catch().then(() => this.loading = false)
    }
  },
  created(){
    this.item_options = options(this.items,['name'],'')
  }
}
</script>
