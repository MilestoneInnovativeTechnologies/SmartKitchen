<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" label="Select Tax Nature" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "TaxNatureSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return this.$store.getters['tax/natures'] }
  }
}
</script>
