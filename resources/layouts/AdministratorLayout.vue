<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-show="$route.name !== 'administrator_index'" :to="{ name:'administrator_index' }" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || admin }}
        </q-toolbar-title>
        <q-btn flat round dense icon="power_settings_new" type="a" :href="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

<!--    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer">
      <q-tabs align="left">
        <q-route-tab :to="{ name:'administrator_index' }" label="Home" icon="home"  />
      </q-tabs>
    </q-footer>-->

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
export default {
  name: 'AdministratorLayout',
  components: {ManualSync},
  data () { return { admin:_USER.name, logout: LOGOUT } },
}
</script>
