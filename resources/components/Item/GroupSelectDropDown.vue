<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "GroupSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return _.map(this.$store.state.groups.data) },
  }
}
</script>
