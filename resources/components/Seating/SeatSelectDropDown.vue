<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" />
</template>

<script>
import Seats from "assets/mixins/Seats";
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "SeatSelectDropDown",
  mixins: [Seats,SelectDropDown],
  computed: {
    options(){ return _.map(this.seats,seat => Object.assign({},seat,{ label:this.getName(seat),value:seat.id })) },
  },
  methods: {
    getName(seat){ return this.name ? this.name(seat) : [seat.name,' (',seat.status,')'].join('') }
  }
}
</script>
