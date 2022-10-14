<template>
  <div>
    <q-select
      hide-selected fill-input use-input
      input-debounce="0" v-model="customer"
      :options="options" @filter="filter"
      @new-value="createCustomer"
      label="Select Customer"
      clearable
      v-bind="$attrs"
    />
    <q-dialog v-model="create_mode"  persistent transition-show="scale" transition-hide="scale">
      <CustomerCreate :param="param" :param_value="param_value" :style="popup_width(400)" @close="closeCreate" @customer="closeCreate" />
    </q-dialog>
  </div>
</template>

<script>
import CustomerCreate from "components/Customer/CustomerCreate";
import {o_customer, o_customers, popup_width} from "assets/helpers";
import { mapState } from 'vuex';

const customer_label_format = settings('customer_display_format') || '[name], [phone]'

export default {
  name: "OrderCustomer",
  components: {CustomerCreate},
  props: ['value','get'],
  data(){ return {
    create_mode: false, param: 'name', param_value: '',
    options: [],
  } },
  computed: {
    ...mapState('customers',{ customers:state => _.filter(state.data,['status','Active']) }),
    customer_options(){ return o_customers(this.customers,customer_label_format) },
    customer: {
      get(){ return this.value === undefined ? null : (this.get === undefined ? this.value : _.find(this.customer_options,[this.get,this.value])) },
      set(customer){ this.$emit('input',this.get === undefined ? customer : _.get(customer,this.get,null)) }
    }
  },
  methods: {
    popup_width,
    filter(val, update){
      update(() => {
        const needle = (val || '').toLowerCase();
        this.options = needle
          ? this.customer_options.filter(v => _.values(v).join(' ').toLowerCase().indexOf(needle) > -1)
          : this.customer_options
      })
    },
    createCustomer(val){
      this.param = (_.toNumber(val) == val) ? 'phone' : 'name';
      this.param_value = val; this.customer = null;
      this.create_mode = true;
    },
    closeCreate(customer){
      this.create_mode = false;
      this.customer = customer ? o_customer(customer,customer_label_format) : null;
    },
  },
  created(){
    this.options = this.customer_options;
  },
  watch: {
    customer(customer){ if(customer && customer.id === 0) this.create_mode = true }
  }
}
</script>
