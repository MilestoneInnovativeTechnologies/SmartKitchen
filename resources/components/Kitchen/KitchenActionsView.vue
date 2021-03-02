<template>
  <q-card>
    <q-card-section class="row justify-between q-pb-none">
      <div class="text-h6">{{ kitchen.name }}</div>
      <q-icon size="lg" :name="'toggle_' + (is_in(kitchen) ? 'on' : 'off')" :color="is_in(kitchen) ? 'positive' : 'grey'" @click="toggle(kitchen)" class="cursor-pointer" />
    </q-card-section>
    <q-card-section horizontal>
      <CardImageTitle :image="image" class="col" />
      <q-card-actions vertical class="flex-center q-gutter-y-sm">
        <q-btn align="left" dense color="red" icon="insights" label="Manage Items" :to="{ name:'kitchen_items',params: { id }  }" />
        <q-btn align="left" dense color="accent" icon="device_hub"  label="View Stock" :to="{ name:'kitchen_stocks',params: { id }  }" />
        <q-select label="Auto Accept" :options="['Yes','No']" outlined dense :value="kitchen.auto_accept" @input="auto" color="green-8" />
        <q-badge :label="'Chefs: ' + chefs.length" color="purple" outline class="q-py-sm" />
      </q-card-actions>
    </q-card-section>
    <q-card-section v-if="kitchen.detail" style="font-size: 0.75rem">{{ kitchen.detail }}</q-card-section>
    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import { mapState } from 'vuex'
import {image} from "assets/helpers";
export default {
  name: "KitchenActionsView",
  components: {CardImageTitle},
  data(){ return { loading: false } },
  props: ['id'],
  computed: {
    ...mapState('kitchens',{ kitchens:'data',status:'status',assign:'assign' }),
    intID(){ return _.toInteger(this.id) },
    kitchen(){ return this.kitchens[this.intID] },
    image() { return image(this.kitchen.image) },
    chefs(){ return _.get(this.status,[this.intID,'users'],[]) }
  },
  methods: {
    is_in({ id }){ return this.assign.includes(_.toInteger(id)) },
    toggle({ id }){ this.loading = true; this.$store.dispatch('kitchens/chef',{ kitchen:id }).then(() => this.loading = false) },
    auto(auto_accept){ this.loading = true; this.$store.dispatch('kitchens/auto',{ id: this.intID, auto_accept }).then(() => this.loading = false) },
  }
}
</script>
