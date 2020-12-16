<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Add Item</div><q-space />
      <q-btn icon="close" flat round dense @click="$emit('close',null)" />
    </q-card-section>
    <q-card-section class="q-gutter-xs q-pb-none">
      <q-select
        outlined dense use-input
        hide-selected fill-input
        input-debounce="0" v-model="item_obj"
        :options="item_options" @filter="filter"
        label="Select Item"
        clearable
      />
      <q-input dense outlined type="number" label="Quantity" v-model.number="params.quantity"/>
      <q-input dense outlined type="number" label="Delay in Minutes" v-model.number="params.delay"/>
      <q-input dense type="textarea" outlined label="Narration if any" v-model="params.narration"/>
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-xs">
      <q-btn color="primary" label="Add Item" type="submit" @click.prevent="add" :loading="loading"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import {options} from "assets/helpers";

export default {
  name: "OrderSummaryItemAdd",
  props: ['token'],
  data(){ return {
    item_obj: null,
    add_item_mode: false,
    item_options: [],
    loading: false,
    params: {
      item: null, quantity: 1, narration: '', delay: 0, token: null
    }
  } },
  computed: {
    ...mapState({ items:({ items:{ data } }) => data,token_items:({ tokens: { items } }) => items }),
    items_in_token(){ return _.map(this.token_items[_.toSafeInteger(this.token)],({ item }) => _.toSafeInteger(item)) },
    // item_options_unique(){ return _.values(_.omitBy(this.item_options,({ id }) => _.includes(this.items_in_token,_.toSafeInteger(id)))) }
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
      this.params.token = this.token;
      if(!this.params.quantity || !this.params.item || !this.params.token) return this.loading = false;
      post('token','item',this.params).then(() => this.$emit('close')).catch().then(() => this.loading = false)
    }
  },
  created(){
    this.item_options = options(this.items,['name'],'')
  }
}
</script>
