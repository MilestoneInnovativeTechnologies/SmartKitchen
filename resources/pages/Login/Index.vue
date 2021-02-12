<template>
  <q-page padding class="flex-center flex">
    <q-card flat>
      <q-card-section class="q-pa-none">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <component :is="component" :style="secs[component][2]" />
        </transition>
      </q-card-section>
      <q-card-actions>
        <q-btn :loading="loading" color="primary" flat :label="secs[component][0]" dense @click="left" icon="keyboard_arrow_left" /><q-space />
        <q-btn :loading="loading" color="primary" flat :label="secs[component][1]" dense @click="right" icon-right="keyboard_arrow_right" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import LoginPassword from "components/Login/LoginPassword";
import LoginPin from "components/Login/LoginPin";
import DisplayBoards from "components/Login/DisplayBoards";
export default {
  name: "PageLoginIndex",
  components: {DisplayBoards, LoginPin, LoginPassword},
  data(){ return {
    secs: { LoginPassword: ['Display','PIN',{ width:'480px' }], LoginPin: ['Password','Display',{ maxWidth:'330px',width:'90vw' }], DisplayBoards: ['PIN','Password',{ width:'680px' }] },
    comps: { Display:'DisplayBoards',PIN:'LoginPin',Password:'LoginPassword' },
    page: null, loading: false,
  } },
  computed: {
    screen(){ return this.$q.screen },
    component(){ return this.page || (this.screen.lt.sm ? 'LoginPin' : (this.screen.lt.lg ? 'LoginPassword' : 'DisplayBoards')) }
  },
  methods: {
    left(){ this.loading = true; this.page = this.comps[this.secs[this.component][0]]; this.$nextTick(function(){ this.loading = false }) },
    right(){ this.loading = true; this.page = this.comps[this.secs[this.component][1]]; this.$nextTick(function(){ this.loading = false }) },
  }
}
</script>
