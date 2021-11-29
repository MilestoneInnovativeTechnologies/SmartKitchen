<template>
  <q-page padding>
    <KitchenTokens v-if="kitchen" :id="kitchen.id" :card="false" />
    <transition-group appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <q-page-sticky :key="'ktp-rs-b'" position="bottom-left" :offset="[18, 18]" class="lt-md" v-show="!reset"><q-btn fab icon="undo" color="negative" padding="sm" @click="reset = true" /></q-page-sticky>
      <q-page-sticky :key="'ktp-aoo-b'" position="bottom-right" :offset="[18, 18]" class="lt-md" v-show="!offline_order" v-if="cloud"><q-btn fab icon="undo" color="secondary" padding="sm" class="flip-horizontal" @click="offline_order = true" /></q-page-sticky>
    </transition-group>
    <q-dialog persistent :value="offline_order" @before-hide="offline_order = false" v-if="cloud">
      <AddRemoteOrder style="width: 22rem" :kitchen="kitchen.id" @imported="offline_order = false" />
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
    offline_order: false,
  } },
  computed: {
    kitchen(){ return _.get(this.$store.state.kitchens.data,_.toInteger(this.$store.state.public.kitchen),null) },
    cloud(){ return _.get(this.kitchen,'cloud') === 'Yes' },
    reset: {
      get(){ return !!_.get(this.$store.state,['public','reset'],false) },
      set(reset){ this.$store.commit('public',{ reset: !!reset }) }
    }
  }
}
</script>
