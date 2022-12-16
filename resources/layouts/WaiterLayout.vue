<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || waiter }}
        </q-toolbar-title>
        <QuickToggle v-if="quick_enabled" />
        <q-btn flat round dense icon="menu_book" :to="{ name:'waiter_menu' }" />
        <q-btn flat round dense icon="switch_account" :to="{ name:'customers' }" v-if="customer_manage" />
        <ManualSync />
		<InstallPrompt v-if="installable" />
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
        <q-route-tab :to="{ name:'take_away' }" label="Take Away" icon="emoji_people" v-if="take_away_manage" />
        <q-route-tab :to="{ name:'waiter_bills' }" label="Bills" icon="pending_actions" v-if="bop_enabled" />
        <q-route-tab :to="{ name:'orders_online' }" label="Online" icon="settings_input_antenna" v-if="online" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import InstallPrompt from "components/InstallPrompt";
import Logout from "components/Logout";
import {settings_boolean} from "assets/helpers";
import QuickToggle from "components/QuickToggle";
const { GH75F,GH56E,RS44Z,NA57A } = require('boot/subscription').FEATURES
export default {
  name: 'WaiterLayout',
  components: {QuickToggle, Logout, ManualSync, InstallPrompt},
  data () { return {
    waiter:_USER.name,
    online_enabled: (GH75F === 'Yes' && GH56E === 'Yes'),
    take_away_enabled: (NA57A === 'Yes'),
  } },
  computed: {
    online(){ return this.online_enabled && settings_boolean(settings('online_order_waiter_handle')) !== false },
	installable(){ return ![undefined,'0'].includes(settings('installable')) },
    customer_manage(){ return settings('manage_customer',_USER.role) },
    bop_enabled(){ return (settings_boolean(settings('waiter_generate_bills')) !== false || settings_boolean(settings('waiter_make_payments')) !== false) },
    quick_enabled(){ return RS44Z === 'Yes' && this.$route.name === 'order_new' },
    take_away_manage(){ return this.take_away_enabled && settings_boolean(settings('take_away_waiter_handle')) === true },
  }
}
</script>
