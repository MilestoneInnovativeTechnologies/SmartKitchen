<template>
  <q-card @click="$emit('selected',seat)">
    <q-img :src="src" basic>
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ seat.name }}
      </div>
    </q-img>
  </q-card>
</template>

<script>
import {image} from "assets/helpers";

export default {
  name: "SeatSelectItem",
  props: ['id'],
  computed: {
    seat(){ return _.get(this.$store.state.seating.data,_.toSafeInteger(this.id)) },
    src(){ return image(this.seat.image); }
  }
}
</script>
