<template>
  <ItemSelectDropDown v-model="item" option-label="name" dark outlined dense label="Item" style="min-width: 6rem" />
</template>

<script>
import ItemSelectDropDown from "components/Item/ItemSelectDropDown";

export default {
  name: "ReportControlItem",
  components: {ItemSelectDropDown},
  computed: {
    item: {
      get(){ return this.$store.state.public.item || null },
      set(item){ this.$store.commit('public',{ item })}
    }
  }
}
</script>
