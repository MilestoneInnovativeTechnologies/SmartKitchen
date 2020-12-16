<template>
  <q-page padding>
    <div class="q-mx-auto" style="max-width: 700px; width: 65vw">
      <KitchenItemsDisplay v-for="kitchen in kitchens" :key="hkey(kitchen)" :kitchen="kitchen" class="q-mb-sm" />
    </div>
  </q-page>
</template>

<script>
import KitchenItemsDisplay from "components/Kitchen/KitchenItemsDisplay";
import {mapState} from "vuex";
import {h_key} from "assets/helpers";

export default {
  name: 'PageKitchenItems',
  components: {KitchenItemsDisplay},
  computed: {
    ...mapState('kitchens', { kitchens: 'assign' }),
  },
  methods: {
    hkey(id){ return h_key('chef','index','kitchens',id) }
  }
}
</script>
