<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" label="Select Menu" option-label="name" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "MenuSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return _.map(this.$store.state.menus.data) }
  }
}
</script>
