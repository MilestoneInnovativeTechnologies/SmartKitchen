<template>
  <q-card>
    <q-card-section class="bg-grey-2 row items-center q-py-xs">
      <div class="text-bold">Select Menu</div><q-space />
      <q-btn round :icon="loading ? 'loop' : 'clear'" flat class="text-weight-bold" :class="{ rotate:loading }" color="red-12" v-close-popup />
    </q-card-section>
    <q-list separator bordered v-if="menus_count">
      <q-item v-for="menu in menus" :key="hKey(menu)" tag="label" clickable @click="selected = menu" v-ripple :disable="loading">
        <q-item-section>
          <q-item-label>{{ menu.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon size="lg" :name="'toggle_' + (is_selected(menu) ? 'on' : 'off')" :color="is_selected(menu) ? 'positive' : 'grey'" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="text-red" v-else>It seems there is no any menu created. Ask administrator to create a menu</q-card-section>
  </q-card>
</template>

<script>
import {h_key} from "assets/helpers";

export default {
  name: "MenuSelect",
  props: ['type'],
  data(){ return {
    loading: false,
  } },
  computed: {
    menus(){ return _.filter(this.$store.state.menus.data,['status','Active']) },
    menus_count(){ return _.size(this.menus) },
    type_name(){ return _.snakeCase([(this.type || 'Dining'),'Menu'].join(' ')) },
    selected: {
      get(){ return _.get(this.$store.state.public,this.type_name,[]) },
      set({ id }){
        this.loading = true;
        this.$store.commit('public',{ [this.type_name]:[id] })
        if(!this.type || this.type === 'Dining') this.$store.dispatch('menus/toggle',parseInt(id),{ root:true })
      }
    }
  },
  methods: {
    is_selected({ id }){ return this.selected.includes(id) },
    hKey({ id }){ return h_key('waiter','menu','select',id) },
  },
  created() {
    let sState = this.$store.state;
    if(sState.menus.s_items.length && this.type === 'Dining' && !_.size(_.get(sState.public,'dining_menu',[])))
      this.$store.commit('public',{ dining_menu:sState.menus.s_items })
    if(!this.selected.length && this.menus_count === 1){ this.selected = _.head(_.values(this.menus)); }
    if(this.type === 'Sale'){ let id = this.$store.getters['menus/sale']; if(id) this.selected = { id } }
  },
  watch: {
    selected(s_menus){ if(s_menus && !_.isEmpty(s_menus)) return this.$emit('selected') }
  }
}
</script>
