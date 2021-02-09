<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || chef }}
        </q-toolbar-title>
        <ManualSync />
        <q-btn flat round dense icon="power_settings_new" type="a" :href="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-dialog :value="k_show" persistent><KitchenSelect style="width: 75vw; max-width: 330px" /></q-dialog>
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer">
      <q-tabs align="left">
        <q-route-tab :to="{ name:'chef_index' }" label="Home" icon="home"  />
        <q-route-tab :to="{ name:kitchens_route }" label="Kitchens" icon="kitchen"  />
        <q-route-tab :to="{ name:'tokens' }" label="Tokens" icon="receipt" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import KitchenSelect from "components/Kitchen/KitchenSelect";

export default {
  name: 'ChefLayout',
  components: {KitchenSelect, ManualSync},
  data(){ return { chef:_USER.name, logout: LOGOUT, kitchens_route: 'chef_kitchens' } },
  computed: {
    assigned(){ return this.$store.state.kitchens.assign },
    k_show(){ return (!this.assigned.length && this.$route.name !== this.kitchens_route) || (this.assigned.length === 1 && this.assigned[0] === 0) },
  },
  created(){
    let kitchens = _SECTION['kitchen'];
    this.$store.commit('kitchens/assign',kitchens,{ root:true })
  }
}
</script>
