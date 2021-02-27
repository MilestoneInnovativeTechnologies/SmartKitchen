<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" use-chips multiple stack-label use-input />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "SeatInputSeats",
  mixins: [SelectDropDown],
  computed: {
    optValue(){ return _.isArray(this.value) ? this.value : (this.value ? [this.value] : []) },
    options(){
      let i = 0, c = _.flatMap(this.$store.state.seating.data,'seats'), a = _.map(Array(_.max(c)-_.min(c)+1+20),() => ++i);
      return _.difference(a,c)
    }
  },

}
</script>
