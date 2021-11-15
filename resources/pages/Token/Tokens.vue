<template>
  <q-page padding>
    <KitchenTokens :id="kitchen" :card="false" />
    <transition-group appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <q-page-sticky :key="'ktp-rs-b'" position="bottom-left" :offset="[18, 18]" class="lt-md" v-show="!reset"><q-btn fab icon="undo" color="negative" padding="sm" @click="reset = true" /></q-page-sticky>
      <q-page-sticky :key="'ktp-aoo-b'" position="bottom-right" :offset="[18, 18]" class="lt-md" v-show="!remote_order"><q-btn fab icon="undo" color="secondary" padding="sm" class="flip-horizontal" @click="remote_order = true" /></q-page-sticky>
    </transition-group>
    <q-dialog persistent :value="remote_order" @before-hide="remote_order = false">
      <AddRemoteOrder style="width: 22rem" :kitchen="kitchen" @imported="remote_order = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import KitchenTokens from "components/Kitchen/KitchenTokens";
import AddRemoteOrder from "components/Remote/AddRemoteOrder";
export default {
  name: 'PageTokens',
  components: {AddRemoteOrder, KitchenTokens},
  data(){ return {
    remote_order: false,
  } },
  computed: {
    kitchen(){ return _.toInteger(this.$store.state.public.kitchen) },
    reset: {
      get(){ return !!_.get(this.$store.state,['public','reset'],false) },
      set(reset){ this.$store.commit('public',{ reset: !!reset }) }
    }
  }
}
</script>
