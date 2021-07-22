<template>
  <q-layout view="hhh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white print-hide" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn v-show="!$route.name.includes('index')" :to="{ name }" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || admin }}
        </q-toolbar-title>
        <div v-if="$route.meta.controls" class="row">
          <ReportControlElement :name="control" v-for="control in $route.meta.controls" :key="hKey(control)" class="q-mr-xs" />
          <q-btn label="Print" color="teal" />
        </div>
        <q-btn flat round dense :icon="$store.state.public.mode === 'report' ? 'admin_panel_settings' : 'analytics'" :to="{ name:ops[$store.state.public.mode] }" />
        <Logout />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import {h_key} from "assets/helpers";
import ReportControlElement from "components/Report/Control/ReportControlElement";
import Logout from "components/Logout";
export default {
  name: 'AdministratorLayout',
  components: {Logout, ReportControlElement, ManualSync},
  data () { return {
    admin:_USER.name,
    ops: { report:'administration_index',administration:'report_index' }
  } },
  computed: {
    name(){ return (this.$store.state.public.mode || 'report') + '_index' }
  },
  methods: {
    hKey(control){ return h_key('alr','control',control) },
    comp(name){ return 'ReportControl' + _.startCase(name).replace(/\s/,'') }
  }
}
</script>
