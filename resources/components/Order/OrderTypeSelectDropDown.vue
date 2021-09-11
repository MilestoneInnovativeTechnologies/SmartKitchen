<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" label="Type" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";
import {OrderTypes} from "assets/assets";

export default {
  name: "OrderTypeSelectDropDown",
  mixins: [SelectDropDown],
  props: ['skip'],
  computed: {
    options(){ return _.difference(OrderTypes,this.skips) },
    skips(){ return _.isString(this.skip) ? [this.skip] : this.skip }
  }
}
</script>
