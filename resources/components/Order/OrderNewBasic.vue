<template>
  <q-card>
    <q-bar class="text-white q-py-sm" style="font-size: 0.8rem" :class="'bg-' + clr"><q-icon name="account_tree" size="xs" left /><span class="text-bold">New Order Details</span><q-space /><q-btn icon="close" flat round v-close-popup /></q-bar>
    <q-card-section class="q-gutter-y-xs">
      <q-select v-if="!hide.includes('type')" outlined input-debounce="0" v-model="params.type" :options="types" label="Select Type" />
      <SeatSelectDropDown error-message="For Dining Seat Selection is Mandatory" :error="seat_error" hide-bottom-space v-if="!hide.includes('seating') && required.includes('Seating')" outlined input-debounce="0" v-model="seat" label="Select Seat" />
      <PriceListSelectDropDown v-if="!hide.includes('price_list') && required.includes('PriceList')" outlined input-debounce="0" v-model="params.price_list" label="Select Price List" get="id" />
      <WaiterSelectDropDown v-if="!hide.includes('user') && required.includes('Waiter')" outlined input-debounce="0" v-model="params.user" label="Select Waiter" get="id" />
      <OrderCustomer v-if="required.includes('Customer')" v-model="params.customer" get="id" outlined />
    </q-card-section>
    <q-card-actions align="right" class="bg-grey-2">
      <q-btn icon-right="forward" :color="clr" label="Proceed" @click="proceed" />
    </q-card-actions>
  </q-card>
</template>

<script>
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import WaiterSelectDropDown from "components/Users/WaiterSelectDropDown";
import SeatSelectDropDown from "components/Seating/SeatSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
import {OrderTypeRequiredFields} from "assets/assets";

export default {
  name: "OrderNewBasic",
  components: {PriceListSelectDropDown, WaiterSelectDropDown, SeatSelectDropDown, OrderCustomer},
  props: ['color','after'],
  data(){ return {
    params: { type:'Dining',seating:null,customer:null,price_list:null,user:null }, seat: null,
    types: ['Dining','Home Delivery','Take Away'],
    hide: [], validate: false,
  } },
  computed: {
    required(){ return OrderTypeRequiredFields[this.params.type || 'Dining'] },
    clr(){ return this.color || 'cyan' },
    attrs(){ return _.pick(this.$attrs,_.keys(this.params)) },
    seat_error(){ return this.validate ? (this.params.type === 'Dining' && !this.params.seating) : false },
  },
  methods: {
    init(attrs){ let vm = this; _.forEach(attrs,function(val,key){ if(val !== undefined) vm.hide.push(key); vm.params[key] = val }) },
    typeChange(type){
      this.params.seating = _.get(this.attrs,'seating',null); this.params.user = _.get(this.attrs,'user',null)
      if(type !== 'Dining') this.setPriceList(type);
    },
    setPriceList(type){
      let type_name = _.snakeCase(type), state_name = type_name + '_price_list';
      if(!_.has(this.$store.state.public,state_name)){
        let price_list_id = _.get(settings('price_list',type),'id',null)
        if(price_list_id) this.$store.commit('public',{ [state_name]:price_list_id })
      }
      this.params.price_list = this.$store.state.public[state_name];
    },
    proceed(){
      this.validate = true; if(this.seat_error) return; this.validate = false;
      this.$router.push({ name:'order_new',params:{ seat:false,after:this.after,...(this.params) } });
    },
  },
  watch: {
    seat({ id,price_list }){ this.params.seating = id; this.params.price_list = price_list },
    'params.type': { immediate:true,handler:'typeChange' },
    'params.price_list': function(id){ let s_name = _.snakeCase(this.params.type+' Price List'); if(this.$store.state.public[s_name] !== parseInt(id)) this.$store.commit('public',{ [s_name]:parseInt(id) }) },
    attrs: { immediate:true, deep:true, handler:'init' },
  }
}
</script>
