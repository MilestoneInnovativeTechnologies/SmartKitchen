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
export default {
  name: "LoginPin",
  data(){ return {
    pin: '', LOGIN, loading: false
  } },
  computed: {
    digs:{
      get(){ return _.padEnd(this.pin,4,"_").split("") },
      set(a){ this.pin = (this.pin + a).substr(-4); }
    }
  },
  methods: {
    backspace(){ this.pin = this.pin.substr(0,_.size(this.pin)-1) },
    login(){ this.loading = true; this.$refs['login_form'].submit() }
  }
}
</script>
