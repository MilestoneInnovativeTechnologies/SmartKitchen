<template>
  <q-card>
    <q-card-section class="bg-grey-2 row items-center">
      <div class="text-bold">Select Menu</div><q-space />
      <q-btn round icon="clear" flat class="text-weight-bold" color="red-12" v-show="selected.length" v-close-popup />
    </q-card-section>
    <q-list separator bordered>
      <q-item v-for="menu in menus" :key="hKey(menu)" clickable @click="selected = menu" v-ripple>
        <q-item-section avatar><q-avatar><img src="https://cdn.quasar.dev/img/boy-avatar.png"></q-avatar></q-item-section>
        <q-item-section>
          <q-item-label>{{ menu.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon size="lg" :name="'toggle_' + (is_selected(menu) ? 'on' : 'off')" :color="is_selected(menu) ? 'positive' : 'grey'" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import {h_key} from "assets/helpers";

export default {
  name: "MenuSelect",
  data(){ return {

  } },
  computed: {
    ...mapState('menus',{ menus:'data',assigned:'s_items' }),
    selected: {
      get(){ return this.assigned },
      set({ id }){ this.$store.dispatch('menus/toggle',id) }
    }
  },
  methods: {
    is_selected({ id }){ return this.selected.includes(id) },
    hKey({ id }){ return h_key('waiter','menu','select',id) },
  },
  created() {
    if(!this.selected.length && _.size(this.menus) === 1) this.selected = _.first(_.values(this.menus))
  }
}
</script>
