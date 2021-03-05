<template>
  <q-card @click="$emit('selected',seat)">
    <q-card-section class="q-py-xs bg-grey"></q-card-section>
    <CardImageTitle :title="seat.name" :image="src" />
  </q-card>
</template>

<script>
import {image} from "assets/helpers";
import CardImageTitle from "components/CardImageTitle";

export default {
  name: "SeatSelectItem",
  components: {CardImageTitle},
  props: ['id'],
  computed: {
    seat(){ return _.get(this.$store.state.seating.data,_.toSafeInteger(this.id)) },
    src(){ return image(this.seat.image); }
  }
}
</script>
