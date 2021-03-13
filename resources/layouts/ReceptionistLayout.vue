<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || receptionist }}
        </q-toolbar-title>
        <ManualSync />
        <q-btn flat round dense icon="power_settings_new" type="a" :href="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer">
      <q-tabs align="left">
        <q-route-tab exact :to="{ name:'receptionist_index' }" label="Home" icon="home" />
        <q-route-tab :to="{ name:'seat_status' }" label="Seating" icon="batch_prediction" />
        <q-route-tab :to="{ name:'receptionist_tokens' }" label="Tokens" icon="receipt" :alert="alert || completed.length>0" alert-icon="new_releases" />
        <q-route-tab :to="{ name:'bills' }" label="Bills" icon="pending_actions" />
        <q-route-tab :to="{ name:'orders' }" label="Orders" icon="add_task" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import {mapState} from "vuex";
import {attention} from "assets/helpers";
export default {
  name: 'ReceptionistLayout',
  components: {ManualSync},
  data(){ return { receptionist:_USER.name, logout: LOGOUT, alert:false } },
  computed: mapState('tokens',{ completed({ data }){ return _.filter(data,['progress','Completed']) } }),
  watch: {
    completed(Nw,Ol){ if(!Ol || Nw.length > Ol.length) {
      attention(); this.alert = 'amber'; setTimeout(vm => vm.alert = false,15000,this)
    } }
  }
}
</script>
