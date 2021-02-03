<template>
  <div class="row q-col-gutter-xs">
    <div class="col-12"><FilterInputText label="Filter Seats" @text="filter = $event" /></div>
    <div class="col-xs-6 col-sm-4 col-md-3 col-2" v-for="seat in seats" :key="hKey(seat)" style="cursor: pointer">
      <SeatSelectItem :id="seat.id" @selected="$emit('selected',seat)" />
    </div>
  </div>
</template>

<script>
import SeatSelectItem from "components/Seating/SeatSelectItem";
import {h_key} from "assets/helpers";
import FilterInputText from "components/FilterInputText";
export default {
  name: "SeatSelect",
  components: {FilterInputText, SeatSelectItem},
  data(){ return { filter:'' } },
  computed: {
    s_seats(){ return this.$store.state.seating.data },
    seats(){ return this.filter ? _.filter(this.s_seats,this.filtered) : this.s_seats },
  },
  methods: {
    hKey({ id }){ return h_key('seat','select','item',id); },
    filtered({ id,name,detail }){ return [id,name,detail].join(' ').toLowerCase().includes(this.filter.toLowerCase()) }
  }
}
</script>
