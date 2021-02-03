<template>
  <q-page padding class="q-gutter-y-xs">
    <KitchenTokens v-for="kitchen in assign" :key="hKey(kitchen)" :id="kitchen" :card="assign.length > 1" />
  </q-page>
</template>

<script>
import {h_key} from "assets/helpers";
import {mapState} from "vuex";
import KitchenTokens from "components/Kitchen/KitchenTokens";
export default {
  name: 'PageTokens',
  components: {KitchenTokens},
  computed: mapState('kitchens',['assign']),
  methods: {
    hKey(kitchen){ return h_key('kitchen',kitchen,'tokens') }
  }
}
</script>
