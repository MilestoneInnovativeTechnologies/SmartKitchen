<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || receptionist }}
        </q-toolbar-title>
        <q-btn flat round dense icon="archive" class="lt-md" :to="{ name:'archives' }" />
        <q-btn flat round dense icon="batch_prediction" class="lt-md" :to="{ name:'seat_status' }" />
        <q-btn flat round dense icon="receipt" class="lt-sm" :to="{ name:'receptionist_tokens' }" ><q-badge color="red" :label="completed.length" transparent floating v-show="completed.length>0" /></q-btn>
        <q-btn flat round dense icon="receipt_long" class="lt-sm" :to="{ name:'bills' }" />
        <q-btn flat round dense label="---" :disable="true" color="primary" />
        <ManualSync />
        <Logout />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer">
      <q-tabs align="left">
        <q-route-tab exact :to="{ name:'receptionist_index' }" label="Home" icon="home" />
        <q-route-tab :to="{ name:'seat_status' }" label="Seating" icon="batch_prediction" class="gt-sm" />
        <q-route-tab :to="{ name:'archives' }" label="Archive" icon="archive" class="gt-sm" />
        <q-route-tab :to="{ name:'receptionist_tokens' }" label="Tokens" icon="receipt" :alert="alert || completed.length>0" alert-icon="new_releases" class="gt-xs" />
        <q-route-tab :to="{ name:'bills' }" label="Bills" icon="receipt_long" class="gt-xs" />
        <q-route-tab :to="{ name:'sale' }" label="Sale" icon="shopping_cart" />
        <q-route-tab :to="{ name:'orders' }" label="Orders" icon="add_task" />
        <q-route-tab :to="{ name:'orders_remote' }" label="Remote" icon="online_prediction" />
        <q-route-tab :to="{ name:'orders_online' }" label="Online" icon="settings_input_antenna" v-if="online" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import {mapState} from "vuex";
import {attention} from "assets/helpers";
import Logout from "components/Logout";
const { GH75F,GH56E } = require('boot/subscription').FEATURES
export default {
  name: 'ReceptionistLayout',
  components: {Logout, ManualSync},
  data(){ return { receptionist:_USER.name, logout: LOGOUT, alert:false, online: (GH75F === 'Yes' && GH56E === 'Yes') } },
  computed: mapState('tokens',{ completed({ data }){ return _.filter(data,['progress','Completed']) } }),
  watch: {
    completed(Nw,Ol){ if(!Ol || Nw.length > Ol.length) {
      attention(); this.alert = 'amber'; setTimeout(vm => vm.alert = false,15000,this)
    } }
  }
}
</script>
