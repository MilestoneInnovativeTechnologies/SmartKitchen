<template>
  <q-page padding class="q-gutter-y-sm">
    <q-select outlined dense input-debounce="0" v-model="params.type" :options="types" label="Select Type" />
    <SeatSelectDropDown v-if="required.includes('Seating')" outlined dense input-debounce="0" v-model="seat" label="Select Seat" />
    <PriceListSelectDropDown v-if="required.includes('PriceList')" outlined dense input-debounce="0" v-model="params.price_list" label="Select Price List" get="id" />
    <WaiterSelectDropDown v-if="required.includes('Waiter')" outlined dense input-debounce="0" v-model="params.user" label="Select Waiter" get="id" />
    <OrderCustomer v-if="required.includes('Customer')" v-model="params.customer" get="id" />
    <q-btn label="Proceed" glossy color="primary" class="full-width" :to="{ name:'receptionist_order_new_items',params }" />
  </q-page>
</template>

<script>
import OrderCustomer from "components/Order/OrderCustomer";
import SeatSelectDropDown from "components/Seating/SeatSelectDropDown";
import WaiterSelectDropDown from "components/Users/WaiterSelectDropDown";
import { OrderTypeRequiredFields } from 'assets/assets'
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
export default {
  name: "PageReceptionistOrderNew",
  components: {PriceListSelectDropDown, WaiterSelectDropDown, SeatSelectDropDown, OrderCustomer},
  data() { return {
    params: { type:'Dining',seating:null,customer:null,price_list:null,user:null }, seat: null,
    types:['Dining','Home Delivery','Take Away','Other']
  } },
  computed: {
    required(){ return OrderTypeRequiredFields[this.params.type || 'Dining'] },
  },
  methods: { },
  watch: {
    seat({ id,price_list }){ this.params.seating = id; this.params.price_list = price_list },
  }
}
</script>
