<template>
  <KitchenSelectDropDown v-model="kitchen" option-label="name" dark outlined dense label="Kitchen" style="min-width: 6rem" />
</template>

<script>
import KitchenSelectDropDown from "components/Kitchen/KitchenSelectDropDown";

export default {
  name: "ReportControlKitchen",
  components: {KitchenSelectDropDown},
  computed: {
    kitchen: {
      get(){ return this.$store.state.public.kitchen || null },
      set(kitchen){ this.$store.commit('public',{ kitchen })}
    }
  }
}
</script>
