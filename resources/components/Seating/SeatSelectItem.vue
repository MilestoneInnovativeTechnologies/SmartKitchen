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
export default {
  name: "SeatSelectItem",
  props: ['id'],
  computed: {
    seat(){ return _.get(this.$store.state.seating.data,_.toSafeInteger(this.id)) },
    src(){ return 'img/defaults/seating.jpg'; }
  }
}
</script>
