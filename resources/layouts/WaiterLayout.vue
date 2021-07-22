<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || waiter }}
        </q-toolbar-title>
        <ManualSync />
        <Logout />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer">
      <q-tabs align="left">
        <q-route-tab :to="{ name:'waiter_index' }" label="Home" icon="home"  />
        <q-route-tab :to="{ name:'waiter_menu' }" label="Menu" icon="menu_book"  />
        <q-route-tab :to="{ name:'orders' }" label="Orders" icon="add_task" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import Logout from "components/Logout";
export default {
  name: 'WaiterLayout',
  components: {Logout, ManualSync},
  data () { return { waiter:_USER.name } },
}
</script>
