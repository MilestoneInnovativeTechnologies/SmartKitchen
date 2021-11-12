<template>
  <q-select v-model="customer" option-label="name" dark outlined dense label="Customer" style="min-width: 6rem" :options="customers" />
</template>

<script>
export default {
  name: "ReportControlCustomer",
  computed: {
    customers(){ return _.filter(this.$store.state.customers.data,customer => _.zipObject(['value','label'],[customer.id,customer.name])) },
    customer: {
      get(){ return this.$store.state.public.customer || null },
      set(customer){ this.$store.commit('public',{ customer })}
    }
  }
}
</script>
