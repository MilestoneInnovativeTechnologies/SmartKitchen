<template>
  <q-card>
    <CardImageTitle :title="kitchen.name" :image="src" />
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
export default {
  name: "KitchenView",
  components: {CardImageTitle},
  props: ['id'],
  data(){ return { src: 'img/defaults/kitchen.png' } },
  computed: {
    kitchen(){ return this.$store.state.kitchens.data[_.toInteger(this.id)] }
  }
}
</script>
