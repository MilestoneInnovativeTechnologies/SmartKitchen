<template>
  <q-page padding>
    <Masonry width="400" :items="kitchens">
      <template #item="kitchen">
        <KitchenActionsView :id="kitchen.id" :me="me" />
      </template>
    </Masonry>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
import {h_key} from "assets/helpers";
import KitchenActionsView from "components/Kitchen/KitchenActionsView";
import Masonry from "components/Masonry";
export default {
  name: "PageChefKitchens",
  components: {Masonry, KitchenActionsView},
  data(){ return {
    split: 70, height: 75, me:_USER.id
  } },
  computed: {
    ...mapGetters('kitchens',{ kitchens:'non_remote' }),
  },
  methods: {
    hKey({ id },item){ return h_key('ckv','kitchen',item,id) },
    assign({ id }){ this.$store.dispatch('kitchens/chef',{ kitchen:id }) }
  }
}
</script>
