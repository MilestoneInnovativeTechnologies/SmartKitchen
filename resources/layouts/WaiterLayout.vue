<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || waiter }}
        </q-toolbar-title>
        <q-btn flat round dense icon="menu_book" :to="{ name:'waiter_menu' }" />
        <q-btn flat round dense icon="switch_account" :to="{ name:'customers' }" v-if="customer_manage" />
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
        <q-route-tab :to="{ name:'orders' }" label="Orders" icon="add_task" />
        <q-route-tab :to="{ name:'waiter_tokens' }" label="Tokens" icon="receipt" />
        <q-route-tab :to="{ name:'waiter_bills' }" label="Bills" icon="pending_actions" />
        <q-route-tab :to="{ name:'orders_online' }" label="Online" icon="settings_input_antenna" v-if="online" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import Logout from "components/Logout";
import {settings_boolean} from "assets/helpers";
const { GH75F,GH56E } = require('boot/subscription').FEATURES
export default {
  name: 'WaiterLayout',
  components: {Logout, ManualSync},
  data () { return { waiter:_USER.name, online_enabled: (GH75F === 'Yes' && GH56E === 'Yes') } },
  computed: {
    online(){ return this.online_enabled && settings_boolean(settings('online_order_waiter_handle')) !== false },
    customer_manage(){ return settings('manage_customer',_USER.role) },
  }
}
</script>
