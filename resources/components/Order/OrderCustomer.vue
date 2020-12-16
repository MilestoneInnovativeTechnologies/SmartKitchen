<template>
  <div>
    <q-select
      outlined dense use-input
      hide-selected fill-input
      input-debounce="0" v-model="customer"
      :options="options" @filter="filter"
      @new-value="createCustomer"
      label="Select Customer"
      clearable
    />
    <q-dialog v-model="create_mode"  persistent transition-show="scale" transition-hide="scale">
      <CustomerCreate :param="param" :param_value="param_value" style="width: 700px; max-width: 60vw;" @close="closeCreate" @customer="closeCreate" />
    </q-dialog>
  </div>
</template>

<script>
import CustomerCreate from "components/Customer/CustomerCreate";
import {o_customer, o_customers} from "assets/helpers";
export default {
  name: "OrderCustomer",
  components: {CustomerCreate},
  data(){ return {
    create_mode: false, param: 'name', param_value: '',
    customer: null,
    options: [],
  } },
  computed: {
    customers(){ return this.$store.state.customers.data },
  },
  methods: {
    filter(val, update){
      update(() => {
        const needle = (val || '').toLowerCase();
        this.options = needle
          ? o_customers(this.customers).filter(v => _.values(v).join(' ').toLowerCase().indexOf(needle) > -1)
          : o_customers(this.customers)
      })
    },
    createCustomer(val){
      this.param = (_.toNumber(val) == val) ? 'phone' : 'name';
      this.param_value = val; this.customer = null;
      this.create_mode = true;
    },
    closeCreate(customer){
      this.create_mode = false;
      this.customer = customer ? o_customer(customer) : null;
    },
  },
  created(){
    this.options = o_customers(this.customers);
  },
  watch: {
    customer(customer){ this.$emit('customer',customer) }
  }
}
</script>
