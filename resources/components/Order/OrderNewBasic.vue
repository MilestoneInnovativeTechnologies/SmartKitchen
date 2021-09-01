<template>
  <q-card>
    <q-bar class="text-white q-py-sm" style="font-size: 0.8rem" :class="'bg-' + clr"><q-icon name="account_tree" size="xs" left /><span class="text-bold">New Order Details</span><q-space /><q-btn icon="close" flat dense round v-close-popup /></q-bar>
    <q-card-section class="q-gutter-y-xs">
      <q-select v-if="!hide.includes('type')" outlined dense input-debounce="0" v-model="params.type" :options="types" label="Select Type" />
      <SeatSelectDropDown v-if="!hide.includes('seating') && required.includes('Seating')" outlined dense input-debounce="0" v-model="seat" label="Select Seat" />
      <PriceListSelectDropDown v-if="!hide.includes('price_list') && required.includes('PriceList')" outlined dense input-debounce="0" v-model="params.price_list" label="Select Price List" get="id" />
      <WaiterSelectDropDown v-if="!hide.includes('user') && required.includes('Waiter')" outlined dense input-debounce="0" v-model="params.user" label="Select Waiter" get="id" />
      <OrderCustomer v-if="required.includes('Customer')" v-model="params.customer" get="id" />
    </q-card-section>
    <q-card-actions align="right" class="bg-grey-2">
      <q-btn icon-right="forward" :color="clr" padding="xs md" size="sm" label="Proceed" @click="$router.push({ name:'order_new',params:{ seat:false,...params } })" />
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
  props: ['color'],
  data(){ return {
    params: { type:'Dining',seating:null,customer:null,price_list:null,user:null }, seat: null,
    types: ['Dining','Home Delivery','Take Away'],
    hide: [],
  } },
  computed: {
    required(){ return OrderTypeRequiredFields[this.params.type || 'Dining'] },
    clr(){ return this.color || 'cyan' },
    attrs(){ return _.pick(this.$attrs,_.keys(this.params)) },
  },
  methods: {
    init(attrs){ let vm = this; _.forEach(attrs,function(val,key){ if(val !== undefined) vm.hide.push(key); vm.params[key] = val }) },
    setPriceList(type){
      if(type === 'Dining') return; let type_name = _.snakeCase(type), state_name = type_name + '_price_list';
      if(!_.has(this.$store.state.public,state_name)){
        let price_list_id = _.get(this.$store.getters[('prices/' + type_name)],'id',null)
        this.$store.commit('public',{ [state_name]:price_list_id })
      }
      this.params.price_list = this.$store.state.public[state_name];
    }
  },
  watch: {
    seat({ id,price_list }){ this.params.seating = id; this.params.price_list = price_list },
    'params.type': { immediate:true,handler:'setPriceList' },
    attrs: { immediate:true, deep:true, handler:'init' },
  }
}
</script>
