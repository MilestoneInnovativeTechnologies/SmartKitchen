<template>
  <UserSelectDropDown v-model="user" option-label="name" :role="['Waiter','Receptionist','Chef','Delivery Boy']" dark outlined dense label="User" style="min-width: 6rem" />
</template>

<script>
import UserSelectDropDown from "components/Users/UserSelectDropDown";

export default {
  name: "ReportControlUser",
  components: {UserSelectDropDown},
  computed: {
    user: {
      get(){ return this.$store.state.public.user || null },
      set(user){ this.$store.commit('public',{ user })}
    }
  }
}
</script>
