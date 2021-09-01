<template>
  <div>
    <FilterInputText label="Filter Seats" @text="filter = $event" class="q-mb-xs" />
    <Masonry :items="seats" width="180">
      <template #item="seat">
        <SeatSelectItem :id="seat.id" @selected="$emit('selected',seat)" class="cursor-pointer" />
      </template>
    </Masonry>
  </div>
</template>

<script>
import SeatSelectItem from "components/Seating/SeatSelectItem";
import {h_key, matches} from "assets/helpers";
import FilterInputText from "components/FilterInputText";
import Masonry from "components/Masonry";

export default {
  name: "SeatSelect",
  components: {Masonry, FilterInputText, SeatSelectItem},
  data(){ return { filter:'' } },
  computed: {
    s_seats(){ return _(this.$store.state.seating.data).filter(['status','Active']).value() },
    seats(){ return this.filter ? _.filter(this.s_seats,seat => matches(seat,['id','name','detail'],this.filter)) : this.s_seats },
  },
  methods: {
    hKey({ id }){ return h_key('seat','select','item',id); },
  }
}
</script>
