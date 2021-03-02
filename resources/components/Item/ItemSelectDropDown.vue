<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "ItemSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return _.map(this.$store.state.items.data) },
  }
}
</script>
