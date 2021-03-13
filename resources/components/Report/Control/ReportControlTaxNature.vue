<template>
  <TaxNatureSelectDropDown v-model="nature" dark outlined dense label="Tax Nature" style="min-width: 6rem" />
</template>

<script>
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";

export default {
  name: "ReportControlTaxNature",
  components: {TaxNatureSelectDropDown},
  computed: {
    nature: {
      get(){ return this.$store.state.public.nature || null },
      set(nature){ this.$store.commit('public',{ nature })}
    }
  }
}
</script>
