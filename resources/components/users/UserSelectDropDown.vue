<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" @clear="clear" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "UserSelectDropDown",
  props: ['role'],
  mixins: [SelectDropDown],
  computed: {
    options(){ return _(this.$store.state.users.data).filter(({ role }) => this.role ? (_.isArray(this.role) ? this.role.includes(role) : role === this.role) : true).map(user => Object.assign({},user,{ label:this.getName(user),value:user.id })).value() },
  },
}
</script>
