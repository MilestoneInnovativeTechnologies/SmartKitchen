<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" label="Payment Type" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";
import {PaymentsTypes} from "assets/assets";

export default {
  name: "PaymentTypeSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return PaymentsTypes }
  }
}
</script>
