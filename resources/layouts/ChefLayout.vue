<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">

      <q-toolbar v-if="special">

        <q-toolbar-title>
          <div class="row items-center">
            <q-btn :to="{ name:'chef_index' }" flat round dense icon="arrow_back_ios" />
            <KitchenSelectElement v-model="kitchen" dark borderless />
          </div>
        </q-toolbar-title>

        <ToolBarTime />

        <q-toolbar-title class="row">
          <q-space />
          <KitchenTokenDisplayMode v-model="mode" dark borderless />
          <q-btn rounded color="white" icon="undo" text-color="red" @click="reset = true" class="q-mx-sm self-center" />
          <ManualSync />
        </q-toolbar-title>

      </q-toolbar>

      <q-toolbar v-else>
        <q-toolbar-title>
          <q-btn v-if="$store.state.back" :to="$store.state.back" flat round dense icon="arrow_back_ios" />
          {{ $store.state.title || chef }}
        </q-toolbar-title>
        <q-btn flat round dense icon="kitchen" :to="{ name:kitchens_route }" />
        <ManualSync />
        <Logout />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-dialog :value="k_show" persistent><KitchenSelect style="width: 75vw; max-width: 330px" /></q-dialog>
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-show="$store.state.footer && !special">
      <q-tabs align="left">
        <q-route-tab :to="{ name:'chef_index' }" label="Home" icon="home"  />
        <q-route-tab :to="{ name:'tokens' }" label="Tokens" icon="receipt" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import ManualSync from "components/ManualSync";
import KitchenSelect from "components/Kitchen/KitchenSelect";
import KitchenSelectElement from "components/Kitchen/KitchenSelectElement";
import KitchenTokenDisplayMode from "components/Kitchen/KitchenTokenDisplayMode";
import {time} from "assets/helpers";
import ToolBarTime from "components/ToolBarTime";
import Logout from "components/Logout";

export default {
  name: 'ChefLayout',
  components: {Logout, ToolBarTime, KitchenTokenDisplayMode, KitchenSelectElement, KitchenSelect, ManualSync},
  data(){ return {
    chef:_USER.name, kitchens_route: 'chef_kitchens', time: now()
  } },
  computed: {
    assigned(){ return _.get(this.$store.getters["kitchens/assign"],parseInt(_USER.id),[]) },
    k_show(){ return !this.assigned.length && this.$route.name !== this.kitchens_route },
    special(){ return this.$route.name === 'tokens' },
    kitchen: {
      get(){ return _.get(this.$store.state,['public','kitchen'],null) },
      set(kitchen){ this.$store.commit('public',{ kitchen }) }
    },
    mode: {
      get(){ return _.get(this.$store.state,['public','mode'],null) },
      set(mode){ this.$store.commit('public',{ mode }) }
    },
    reset: {
      get(){ return !!_.get(this.$store.state,['public','reset'],false) },
      set(reset){ this.$store.commit('public',{ reset: !!reset }) }
    },
  }
}

function now(){ return time(new Date().getTime()+'','x') }
</script>
