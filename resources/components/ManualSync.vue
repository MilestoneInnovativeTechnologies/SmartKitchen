<template>
  <q-btn flat round dense icon="sync" :disable="since < 3" :class="{ spin:(since<1) }" @click="$store.dispatch('server/ping')" />
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ManualSync",
  data(){ return { now:0 } },
  computed: mapState('server',{ since({ pinged }){ return this.now - pinged } }),
  created() {
    setInterval(vm => vm.now = _.toInteger(new Date().getTime()/1000),1000,this)
  }
}
</script>
