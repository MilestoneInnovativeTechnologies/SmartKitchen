<template>
  <q-page padding>
    <AdministratorImageCommon content="customer" :filter="['name','phone','email']" name="name" :list="customers" />
  </q-page>
</template>

<script>
import AdministratorImageCommon from "components/Administrator/AdministratorImageCommon";

export default {
  name: "PageAdministratorImageCustomer",
  components: {AdministratorImageCommon},
  data(){ return {
  } },
  computed: {
    customers(){ return this.$store.state.customers.data },
  },
}
</script>
