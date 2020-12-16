<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-tabs align="left">
        <q-route-tab :to="{ name:'chef_index' }" label="Home" icon="home"  />
        <q-route-tab :to="{ name:'kitchen_items' }" label="Items" icon="category"  />
        <q-route-tab :to="{ name:'tokens' }" label="Tokens" icon="receipt" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'ChefLayout',
  created(){
    let kitchens = _SECTION['kitchen'];
    this.$store.commit('kitchens/assign',kitchens,{ root:true })
  }
}
</script>
