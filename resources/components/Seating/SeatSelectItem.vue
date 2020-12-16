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
import images from '../../assets/default_images'
export default {
  name: "SeatSelectItem",
  props: ['id'],
  computed: {
    seat(){ return _.get(this.$store.state.seating.data,_.toSafeInteger(this.id)) },
    src(){ return 'https://cdn.quasar.dev/img/parallax2.jpg'; /*images.seating*/ }
  }
}
</script>
