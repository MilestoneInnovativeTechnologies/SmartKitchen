<template>
  <TaxNameSelectDropDown v-model="tax" dark outlined dense label="Tax" option-label="name" style="min-width: 6rem" />
</template>

<script>

import TaxNameSelectDropDown from "components/Tax/TaxNameSelectDropDown";
export default {
  name: "ReportControlTax",
  components: {TaxNameSelectDropDown},
  computed: {
    tax: {
      get(){ return this.$store.state.public.tax || null },
      set(tax){ this.$store.commit('public',{ tax })}
    }
  }
}
</script>
