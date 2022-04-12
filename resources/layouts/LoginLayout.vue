<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">

      <q-toolbar v-if="!displays">
        <q-toolbar-title>Login</q-toolbar-title>
        <q-btn type="a" href="subscription" :label="MSG[count%(MSG.length)]" flat dense />
      </q-toolbar>
    </q-header>

    <q-page-container v-if="CODE_VALID && KEY_VALID" @mousemove="scrolled">
      <router-view :color="$route.meta.color || 'primary'" />
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-page-sticky v-show="fab" position="bottom-left" :offset="offset" v-if="displays"><q-fab icon="reply" :color="$route.meta.color || 'primary'" glossy to="/" v-touch-pan.prevent.mouse="move" /></q-page-sticky>
      </transition>
    </q-page-container>
    <q-page-container v-else>
      <q-page class="flex flex-center column">
        <div class="bg-black q-pa-xl text-green text-center text-uppercase" style="width: 360px; max-width: 90vw">
          <div>{{ CODE_VALID ? (KEY_VALID ? '' : 'subscription key is invalid') : 'subscription code is invalid'}}</div>
          <div class="text-bold">--- {{ CODE_INVALID_REASON }} ---</div>
          <div>Please contact vendor</div>
          <div>ERROR CODE: {{ CODE_INVALID_ERROR_CODE }}</div>
        </div>
        <q-btn @click="KEY_MOVE()" label="Enter Key & Code" dense flat class="text-primary" no-caps />
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-primary text-white" v-if="!displays">
      <q-tabs align="center">
        <q-tab label="PIN" icon="money" @click="$store.commit('public',{ login:'pin' })" />
        <q-tab label="Password" icon="vpn_key" @click="$store.commit('public',{ login:'password' })" />
        <q-tab label="Display" icon="tv" @click="$store.commit('public',{ login:'display' })" v-if="$q.screen.gt.sm" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import {
  CLIENT, BRANCH, EDITION, VALID_UPTO, KEY_VALID, CODE_VALID,
  CODE_INVALID_ERROR_CODE, CODE_INVALID_REASON, KEY_MOVE, KEY_CHANGE_REQUIRED
} from "boot/subscription";
import {debounce} from "quasar";
let timeout = 0;

export default {
  name: 'LoginLayout',
  data(){ return {
    CLIENT, BRANCH, EDITION, VALID_UPTO, count:0,
    KEY_VALID, CODE_VALID, CODE_INVALID_ERROR_CODE, CODE_INVALID_REASON,
    MSG: [`${CLIENT}`,`${BRANCH}`,`${EDITION} Edition`,`Valid Upto: ` + VALID_UPTO.split(' ')[0]],
    KEY_MOVE, KEY_CHANGE_REQUIRED,
    fab: true,  offset: [24,24],
  } },
  created() {
    setInterval(vm => vm.count++,10000,this)
    this.delayed_hide()
  },
  computed: {
    displays(){ return this.$route.fullPath !== '/' },
    out_ping(){ return !!this.$route.meta.out_ping },
  },
  methods: {
    scrolled: _.throttle(function(){
      if(!this.fab) return this.delayed_hide(this.fab = true);
      if(timeout) clearTimeout(timeout);
      this.delayed_hide()
    },2499,{ leading:true }),
    move(ev){ this.offset = [this.offset[0] + ev.delta.x, this.offset[1] - ev.delta.y] },
    delayed_hide(){ timeout = setTimeout(vm => vm.fab = false,2500,this) }
  },
  watch: {
    out_ping(status){ if(status) this.$store.dispatch('server/out_ping') }
  }
}
</script>
