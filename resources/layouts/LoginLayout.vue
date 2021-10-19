<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">

      <q-toolbar>
        <q-toolbar-title>Login</q-toolbar-title>
        <q-btn type="a" href="subscription" :label="MSG[count%(MSG.length)]" flat dense />
      </q-toolbar>
    </q-header>

    <q-page-container v-if="CODE_VALID && KEY_VALID">
      <router-view />
    </q-page-container>
    <q-page-container v-else>
      <q-page class="flex flex-center">
        <div class="bg-black q-pa-xl text-green text-center text-uppercase" style="width: 360px; max-width: 90vw">
          <div>{{ CODE_VALID ? (KEY_VALID ? '' : 'subscription key is invalid') : 'subscription code is invalid'}}</div>
          <div class="text-bold">--- {{ CODE_INVALID_REASON }} ---</div>
          <div>Please contact vendor</div>
          <div>ERROR CODE: {{ CODE_INVALID_ERROR_CODE }}</div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-tabs align="center">
        <q-tab label="PIN" icon="money" @click="$store.commit('public',{ login:'pin' })" />
        <q-tab label="Password" icon="vpn_key" @click="$store.commit('public',{ login:'password' })" />
        <q-tab label="Display" icon="tv" @click="$store.commit('public',{ login:'display' })" v-if="$q.screen.gt.sm" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import { CLIENT,BRANCH,EDITION,VALID_UPTO,KEY_VALID,CODE_VALID,CODE_INVALID_ERROR_CODE,CODE_INVALID_REASON } from "boot/subscription";

export default {
  name: 'LoginLayout',
  data(){ return {
    CLIENT, BRANCH, EDITION, VALID_UPTO, count:0,
    KEY_VALID, CODE_VALID, CODE_INVALID_ERROR_CODE, CODE_INVALID_REASON,
    MSG: [`${CLIENT}`,`BRANCH: ${BRANCH}`,`${EDITION} Edition`,`Valid Till: ` + VALID_UPTO.split(' ')[0]]
  } },
  created() {
    setInterval(vm => vm.count++,10000,this)
  }
}
</script>
