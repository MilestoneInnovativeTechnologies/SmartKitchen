<template>
  <q-page padding class="q-gutter-y-md">
    <div class="row">
      <div class="col-6"><FilterInputText @text="filter = $event" /></div>
      <div class="col-6 q-gutter-xs q-px-sm">
        <q-btn rounded glossy push size="sm" :color="(filter == '') ? 'positive' : 'grey'" @click="filter = ''" label="All" />
        <q-btn rounded glossy push size="sm" :color="(filter == 'Vacant') ? 'positive' : 'grey'" @click="filter = (filter == 'Vacant') ? '' : 'Vacant'" label="Vacant" />
        <q-btn rounded glossy push size="sm" :color="(filter == 'Busy') ? 'positive' : 'grey'" @click="filter = (filter == 'Busy') ? '' : 'Busy'" label="Busy" />
        <q-btn rounded glossy push size="sm" :color="(filter == 'New') ? 'positive' : 'grey'" @click="filter = (filter == 'New') ? '' : 'New'" label="New/Just" />
        <q-btn rounded glossy push size="sm" :color="(filter == 'Processing') ? 'positive' : 'grey'" @click="filter = (filter == 'Processing') ? '' : 'Processing'" label="Processing" />
        <q-btn rounded glossy push size="sm" :color="(filter == 'Completed') ? 'positive' : 'grey'" @click="filter = (filter == 'Completed') ? '' : 'Completed'" label="Completed" />
        <q-btn rounded glossy push size="sm" :color="(filter == 'Billed') ? 'positive' : 'grey'" @click="filter = (filter == 'Billed') ? '' : 'Billed'" label="Billed" />
      </div>
    </div>
    <Masonry :items="filtered">
      <template #item="seat">
        <SeatStatusPreview v-bind="seat" />
      </template>
    </Masonry>
  </q-page>
</template>

<script>
import {mapState} from "vuex";
import FilterInputText from "components/FilterInputText";
import {h_key, matches} from "assets/helpers";
import SeatStatusPreview from "components/Seating/SeatStatusPreview";
import Seats from "assets/mixins/Seats";
import Masonry from "components/Masonry";

export default {
  name: "PageSeatingStatus",
  components: {Masonry, SeatStatusPreview, FilterInputText},
  data(){ return {
    filter: '',
  } },
  mixins: [Seats],
  computed: mapState({
    bills({ bills: { data } }){ return _(data).filter(({ progress }) => progress !== 'Cancelled').keyBy('token').mapValues('progress').value() },
    filtered(){ return this.filter ? _.filter(this.seats,this.match) : this.seats },
  }),
  methods: {
    hKey({ id }){ return h_key('seat','status','seat',id) },
    match(obj){ return matches(obj,['name','status','customer','phone','progress','waiter','price','token'],this.filter) }
  }
}
</script>
