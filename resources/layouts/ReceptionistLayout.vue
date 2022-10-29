<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || receptionist }}
        </q-toolbar-title>
        <QuickToggle v-if="quick_enabled" />
        <q-btn flat round dense icon="archive" class="lt-md" :to="{ name:'archives' }" />
        <q-btn flat round dense icon="batch_prediction" class="lt-md" :to="{ name:'seat_status' }" />
        <q-btn flat round dense icon="auto_awesome" v-if="item_create" @click="create_item = true" />
        <q-btn flat round dense icon="switch_account" :to="{ name:'customers' }" v-if="customer_manage" />
        <q-btn flat round dense icon="receipt_long" class="lt-sm" :to="{ name:'bills' }" ><q-badge color="red" :label="completed.length" transparent floating v-show="completed.length>0" /></q-btn>
        <q-btn flat round dense label="---" :disable="true" color="primary" />
        <ManualSync />
        <Logout />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-dialog persistent v-model="create_item"><InstantItemCreateCard :style="popup_width()" /></q-dialog>
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer">
      <q-tabs align="left">
        <q-route-tab exact :to="{ name:'receptionist_index' }" label="Home" icon="home" />
        <q-route-tab :to="{ name:'seat_status' }" label="Seating" icon="batch_prediction" class="gt-sm" />
        <q-route-tab :to="{ name:'archives' }" label="Archive" icon="archive" class="gt-sm" />
        <q-route-tab :to="{ name:'bills' }" label="Bills" icon="receipt_long" class="gt-xs"  :alert="alert || completed.length>0" alert-icon="new_releases" />
        <q-route-tab :to="{ name:'sale' }" label="Sale" icon="shopping_cart" v-if="sale_enabled" />
        <q-route-tab :to="{ name:'take_away' }" label="Take Away" icon="emoji_people" v-if="take_away_manage" />
        <q-route-tab :to="{ name:'orders' }" label="Orders" icon="add_task" />
        <q-route-tab :to="{ name:'orders_remote' }" label="Remote" icon="online_prediction" v-if="remote_manage" />
        <q-route-tab :to="{ name:'orders_online' }" label="Online" icon="settings_input_antenna" v-if="online" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import {mapState} from "vuex";
import {attention, popup_width, settings_boolean} from "assets/helpers";
import Logout from "components/Logout";
import QuickToggle from "components/QuickToggle";
import InstantItemCreateCard from "components/Item/InstantItemCreateCard";
const { GH75F,GH56E,CC71V,DP71V,KK99V,CZ03Y,RS44Z,NA57A } = require('boot/subscription').FEATURES
export default {
  name: 'ReceptionistLayout',
  components: {InstantItemCreateCard, QuickToggle, Logout, ManualSync},
  data(){ return { receptionist:_USER.name, logout: LOGOUT, alert:false,
    online_enabled: (GH75F === 'Yes' && GH56E === 'Yes'),
    remote_enabled: (CC71V === 'Yes' && _.trim(DP71V) !== '' ),
    sale_enabled: (CZ03Y === 'Yes'),
    take_away_enabled: (NA57A === 'Yes'),
  } },
  computed: {
    ...mapState('tokens',{ completed({ data }){ return _.filter(data,({ progress }) => ['Completed'].includes(progress)) } }),
    online(){ return this.online_enabled && settings_boolean(settings('online_order_waiter_handle')) !== false },
    customer_manage(){ return settings('manage_customer',_USER.role) },
    item_create(){ return settings_boolean(settings('instant_item_create')) === true },
    remote_manage(){ return this.remote_enabled && KK99V === 'Yes' && settings_boolean(settings('receptionist_remote_orders')) !== false },
    quick_enabled(){ return RS44Z === 'Yes' && ['order_new','sale'].includes(this.$route.name) },
    take_away_manage(){ return this.take_away_enabled && settings_boolean(settings('take_away_receptionist_handle')) !== false },
    create_item: {
      get(){ return _.get(this.$store.state,['public','item_create'],false) },
      set(item_create){ this.$store.commit('public',{ item_create }) }
    }
  },
  methods: {
    popup_width
  },
  watch: {
    completed(Nw,Ol){ if(!Ol || Nw.length > Ol.length) {
      attention(); this.alert = 'amber'; setTimeout(vm => vm.alert = false,15000,this)
    } }
  }}
</script>
