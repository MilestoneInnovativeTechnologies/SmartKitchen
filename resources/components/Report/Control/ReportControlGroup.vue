<template>
  <GroupSelectDropDown v-model="group" option-label="name" dark outlined dense label="Item Group" style="min-width: 6rem" />
</template>

<script>
import GroupSelectDropDown from "components/Item/GroupSelectDropDown";

export default {
  name: "ReportControlGroup",
  components: {GroupSelectDropDown},
  computed: {
    group: {
      get(){ return this.$store.state.public.group || null },
      set(group){ this.$store.commit('public',{ group })}
    }
  }
}
</script>
