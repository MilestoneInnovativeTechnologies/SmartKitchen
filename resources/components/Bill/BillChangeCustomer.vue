<template>
  <q-card>
    <q-card-section class="bg-indigo text-white items-center row justify-between q-py-sm">Change Customer <q-btn icon="close" v-close-popup flat dense rounded color="white" /></q-card-section>
    <q-card-section>
      <OrderCustomer v-model="customer" label="Customer" get="id" outlined />
    </q-card-section>
    <q-card-section class="bg-indigo q-py-none">&nbsp;</q-card-section>
    <q-inner-loading :showing="loading"><q-spinner-facebook color="indigo" size="xl" /></q-inner-loading>
  </q-card>
</template>

<script>
import OrderCustomer from "components/Order/OrderCustomer";
export default {
  name: "BillChangeCustomer",
  components: {OrderCustomer},
  props: ['token'],
  data(){ return {
    loading:false,
  } },
  computed: {
    customer: {
      get(){ return _.get(this.token,_.isObject(this.token.customer) ? ['customer','id'] : 'customer') },
      set(customer){
        if(!customer) return; this.loading = true;
        post('token','customer',{ token:this.token.id,customer }).then().catch().finally(() => {
          this.loading = false;
          this.$emit('changed');
        })
      }
    }
  }
}
</script>
