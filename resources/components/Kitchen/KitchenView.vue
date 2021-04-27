<template>
  <q-card>
    <CardImageTitle :title="kitchen.name" :image="src" />
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {image} from "assets/helpers";
export default {
  name: "KitchenView",
  components: {CardImageTitle},
  props: ['id'],
  computed: {
    kitchen(){ return this.$store.state.kitchens.data[_.toInteger(this.id)] },
    src(){ return image(this.kitchen.image) }
  }
}
</script>
