<template>
  <div class="q-col-gutter-xs">
    <FilterInputText label="Filter Seats" @text="filter = $event" />
    <Masonry :items="seats" width="180">
      <template #item="seat">
        <SeatSelectItem :id="seat.id" @selected="$emit('selected',seat)" class="cursor-pointer" />
      </template>
    </Masonry>
  </div>
</template>

<script>
import SeatSelectItem from "components/Seating/SeatSelectItem";
import {h_key} from "assets/helpers";
import FilterInputText from "components/FilterInputText";
import Masonry from "components/Masonry";

export default {
  name: "SeatSelect",
  components: {Masonry, FilterInputText, SeatSelectItem},
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
