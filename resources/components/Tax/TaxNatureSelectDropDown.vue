<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" label="Select Tax Nature" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "TaxNatureSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return _.uniq(_.flatMap(this.$store.state.tax.data,({ contents }) => _.map(contents,'nature'))) }
  }
}
</script>
