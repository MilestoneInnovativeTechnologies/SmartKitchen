<template>
  <div class="row q-col-gutter-xs">
    <div class="col-xs-6 col-sm-4 col-md-3 col-2" v-for="seat in seats" :key="hKey(seat)" style="cursor: pointer">
      <SeatSelectItem :id="seat.id" @selected="$emit('selected',seat)" />
    </div>
  </div>
</template>

<script>
import SeatSelectItem from "components/Seating/SeatSelectItem";
import {h_key} from "assets/helpers";
export default {
  name: "SeatSelect",
  components: {SeatSelectItem},
  computed: {
    seats(){ return this.$store.state.seating.data },
  },
  methods: {
    hKey({ id }){ return h_key('seat','select','item',id); },
  }
}
</script>
