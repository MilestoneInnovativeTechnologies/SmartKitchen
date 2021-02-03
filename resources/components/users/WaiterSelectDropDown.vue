<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "WaiterSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return _(this.$store.state.users.data).filter(['role','Waiter']).map(user => Object.assign({},user,{ label:this.getName(user),value:user.id })).value() },
  },
}
</script>
