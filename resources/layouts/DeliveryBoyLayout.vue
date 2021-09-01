<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || name }}
        </q-toolbar-title>
        <q-btn flat round dense icon="switch_account" :to="{ name:'delivery_boy_customers' }" />
        <ManualSync />
        <Logout />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer">
      <q-tabs align="left">
        <q-route-tab :to="{ name:'delivery_boy_index' }" label="Home" icon="home"  />
        <q-route-tab :to="{ name:'orders' }" label="Orders" icon="add_task" />
        <q-route-tab :to="{ name:'delivery_boy_completed' }" label="Billable" icon="receipt" :alert="billable.length > 0 ? 'red' : false" alert-icon="new_releases" />
        <q-route-tab :to="{ name:'delivery_boy_payments' }" label="Payments" icon="account_balance" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import Logout from "components/Logout";
import {attention} from "assets/helpers";
export default {
  name: 'DeliveryBoyLayout',
  components: {Logout, ManualSync},
  data () { return { name:_USER.name, logout: LOGOUT } },
  computed: {
    billable(){ return _(this.$store.state.tokens.data).filter({ type:'Home Delivery',progress:'Processing' }).filter(({ id }) => is_all_completed(this.$store.state.tokens.items[parseInt(id)])).filter(({ id }) => !_.find(this.$store.state.bills.data,['token',parseInt(id)])).value() }
  },
  watch: {
    billable(Nw,Ol){ if(!Ol || Nw.length > Ol.length) { attention(); } },
  }
}
function is_all_completed(items){
  return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed','Served'],progress))
}
</script>
