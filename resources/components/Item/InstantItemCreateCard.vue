<template>
  <q-card>
    <q-card-section class="row items-center justify-between bg-light-blue text-white q-py-sm"><div class="text-bold">Add New Item</div><q-btn icon="close" v-close-popup color="white" flat rounded dense /></q-card-section>
    <q-card-section class="q-gutter-y-xs">
      <q-input v-model="params.name" outlined dense label="Item Name" />
      <q-select v-model="group" :options="groups" outlined dense label="Select Group" />
      <q-select v-model="kitchen" :options="kitchens" outlined dense label="Select Kitchen" />
      <div class="row q-col-gutter-xs q-mt-xs">
        <div class="col-6" v-for="pl in plists" :key="'iicc-pl-' + pl.id"><q-input type="number" v-model.number="params.prices[pl.id]" outlined dense :label="pl.name" /></div>
      </div>
    </q-card-section>
    <q-card-actions align="right" class="bg-grey-1">
      <q-btn :loading="loading" label="Save" color="primary" @click="save" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {options} from "assets/helpers";

export default {
  name: "InstantItemCreateCard",
  data(){ return {
    params: { name:'',group:null, prices: {}, kitchen:null },
    group: null, kitchen: null,
    loading: false
  } },
  computed: {
    groups(){ return options(this.$store.state.groups.data,['name'],",") },
    kitchens(){ return options(this.$store.state.kitchens.data,['name'],",") },
    plists(){ return this.$store.state.prices.list },
  },
  methods: {
    save(){
      this.loading = true;
      if(!this.params.name || !this.params.group || !this.params.kitchen) return this.loading = false;
      post('item','instant',this.params).then(() => {
        this.loading = false; this.$store.commit('public',{ item_create:false })
      })
    },
  },
  watch: {
    group(group){ this.params.group = group ? group.id : null },
    kitchen(kitchen){ this.params.kitchen = kitchen ? kitchen.id : null },
  },
  created() {
    this.params.prices = Object.assign({},this.params.prices,_(this.plists).mapKeys(pl => _.toInteger(pl.id)).mapValues(() => 0).value())
    this.group = _.first(this.groups);
    this.kitchen = _.first(this.kitchens);
  }
}
</script>
