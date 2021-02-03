<template>
  <q-page padding>
        <div class="q-mx-auto q-col-gutter-sm q-pb-sm" style="max-width: 360px; width: 90vw">
          <div class="col" v-for="kitchen in kitchens" :key="hKey(kitchen,'all')">
            <KitchenActionsView :id="kitchen.id" />
          </div>
        </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import {h_key} from "assets/helpers";
import KitchenActionsView from "components/Kitchen/KitchenActionsView";
export default {
  name: "PageChefKitchens",
  components: {KitchenActionsView},
  data(){ return {
    split: 70, height: 75
  } },
  computed: {
    ...mapState('kitchens',{ kitchens:'data', assigned:'assign' }),
  },
  methods: {
    hKey({ id },item){ return h_key('ckv','kitchen',item,id) },
    assign({ id }){ this.$store.dispatch('kitchens/chef',{ kitchen:id }) }
  }
}
</script>
