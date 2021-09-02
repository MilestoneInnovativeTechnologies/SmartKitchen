<template>
  <UserSelectDropDown v-model="user" option-label="name" :role="['Delivery Boy']" dark outlined dense label="Delivery Boy" style="min-width: 6rem" />
</template>

<script>
import UserSelectDropDown from "components/Users/UserSelectDropDown";

export default {
  name: "ReportControlDeliveryBoy",
  components: {UserSelectDropDown},
  computed: {
    user: {
      get(){ return this.$store.state.public.delivery_boy || null },
      set(delivery_boy){ this.$store.commit('public',{ delivery_boy })}
    }
  }
}
</script>
