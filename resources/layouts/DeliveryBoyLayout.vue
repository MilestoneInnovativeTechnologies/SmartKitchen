<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || name }}
        </q-toolbar-title>
        <QuickToggle v-if="quick_enabled" />
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
        <q-route-tab :to="{ name:'delivery_boy_index' }" label="Home" icon="home"  />
        <q-route-tab :to="{ name:'orders' }" label="Orders" icon="add_task" v-if="ordering" />
        <q-route-tab :to="{ name:'delivery_boy_completed' }" label="Billable" icon="receipt" :alert="billable.length > 0 ? 'red' : false" alert-icon="new_releases" />
        <q-route-tab :to="{ name:'delivery_boy_billed' }" label="Deliverable" icon="local_shipping" :alert="deliverable.length > 0 ? 'red' : false" alert-icon="new_releases" />
        <q-route-tab :to="{ name:'delivery_boy_payments' }" label="Payments" icon="account_balance" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import InstallPrompt from "components/InstallPrompt";
import Logout from "components/Logout";
import {attention, settings_boolean} from "assets/helpers";
import QuickToggle from "components/QuickToggle";
import Bills from "assets/mixins/Bills";
const { RS44Z } = require('boot/subscription').FEATURES
export default {
  name: 'DeliveryBoyLayout',
  components: {QuickToggle, Logout, ManualSync, InstallPrompt},
  mixins: [Bills],
  data () { return { name:_USER.name, logout: LOGOUT } },
  computed: {
    hide_others(){ return settings_boolean(settings('delivery_boy_hide_others_billed')) === true },
	installable(){ return ![undefined,'0'].includes(settings('installable')) },
    billable(){
      return _(this.tokens)
        .filter(token => token.type === 'Home Delivery' && is_all_completed(token.items))
        .filter(token => !_.includes(this.$store.getters['tokens/billed'],token.id))
        .value()
    },
    deliverable(){
      return _(this.bills)
        .filter(bill => ['Pending','Partial'].includes(bill.progress) && bill.token.type === 'Home Delivery')
        .filter(bill => this.hide_others ? is_mine(bill,this.$route.meta.me.id) : true)
        .value()
    },
    customer_manage(){ return settings('manage_customer',_USER.role) },
    quick_enabled(){ return RS44Z === 'Yes' && ['order_new'].includes(this.$route.name) },
    ordering() { return settings_boolean(settings('delivery_boy_take_orders')) !== false }
  },
  watch: {
    billable(Nw,Ol){ if(!Ol || Nw.length > Ol.length) { attention(); } },
  }
}
function is_all_completed(items){ return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed','Served'],progress)) }
function is_mine({ user },id){ return user && user.id === id }

</script>
