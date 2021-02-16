<template>
  <q-page padding>
    <KitchenTokens :id="kitchen" :card="false" />
  </q-page>
</template>

<script>
import KitchenTokens from "components/Kitchen/KitchenTokens";
export default {
  name: 'PageTokens',
  components: {KitchenTokens},
  computed: {
    kitchen(){ return _.toInteger(this.$store.state.public.kitchen) }
  }
}
</script>
