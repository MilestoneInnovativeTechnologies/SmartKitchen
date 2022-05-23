<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" :label="label || 'Payment Type'" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";
import {PaymentsTypes} from "assets/assets";

export default {
  name: "PaymentTypeSelectDropDown",
  props: ['label'],
  mixins: [SelectDropDown],
  computed: {
    options(){ return PaymentsTypes }
  }
}
</script>
