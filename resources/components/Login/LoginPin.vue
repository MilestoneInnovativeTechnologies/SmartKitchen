<template>
  <q-card>
    <q-card-section class="bg-grey-2">
      <div class="row q-col-gutter-x-xs">
        <div class="col-3" v-for="(dig,idx) in digs" :key="'dif-' + idx">
          <div class="text-center bg-white q-pa-sm text-bold text-grey-8" style="font-size: 1.85rem" v-html="dig" />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-xs">
        <div class="col-4" v-for="n in 9" :key="`pin-number-${n}`">
          <q-btn :label="n" color="primary" glossy size="md" class="full-width" style="font-size: 1.25rem" padding="md md" @click="digs = n" />
        </div>
        <div class="col-4"><q-btn icon="backspace" color="primary" glossy size="md" class="full-width" style="font-size: 1.25rem" padding="md md" @click="backspace" /></div>
        <div class="col-4"><q-btn label="0" color="primary" glossy size="md" class="full-width" style="font-size: 1.25rem" padding="md md" @click="digs = 0" /></div>
        <div class="col-4"><q-btn icon="keyboard_return" color="primary" glossy size="md" class="full-width" style="font-size: 1.25rem" padding="md md" :disable="pin.length < 4" @click="login"/></div>
      </div>
      <form ref="login_form" :action="LOGIN" method="post" v-show="false">
        <q-input type="hidden" name="pin" :value="pin" />
      </form>
    </q-card-section>
    <q-inner-loading :showing="loading">
      <q-spinner-grid size="150px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import {tap} from "assets/helpers";

export default {
  name: "LoginPin",
  data(){ return {
    pin: '', LOGIN, loading: false
  } },
  computed: {
    digs:{
      get(){ return _.padEnd(this.pin,4,"_").split("") },
      set(a){ tap(); this.pin = (this.pin + a).slice(-4); }
    }
  },
  methods: {
    backspace(){ tap(); this.pin = this.pin.slice(0,_.size(this.pin)-1); },
    login(){ tap(); this.loading = true; this.$refs['login_form'].submit() },

    eventManage(eFn){
      if(!this.$q.platform.is.desktop) return;
      eFn('keypress',this.docListen); eFn('keyup',this.docListenKeyup)
    },
    docListenKeyup(e){ if(['Backspace','Delete','Escape','Tab'].includes(e.key)) this.docListen(e) },
    docListen(e){
      if([0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9'].includes(e.key)) return this.digs = e.key
      if(['Enter','+','=','Tab'].includes(e.key) && !e.ctrlKey) return this.login();
      if(['Enter','\n'].includes(e.key) && e.ctrlKey) return this.login();
      if(['b','B','Backspace'].includes(e.key)) return this.backspace();
      if(['c','C','Delete','Escape'].includes(e.key)) return tap() || (this.pin = '');
    },

  },
  created() { this.eventManage(document.addEventListener) },
  beforeDestroy() { this.eventManage(document.removeEventListener) },
}
</script>
