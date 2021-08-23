<template>
  <q-page padding class="q-gutter-y-sm">
    <PriceListSelectDropDown outlined dense input-debounce="0" v-model="params.price_list" label="Select Price List" get="id" />
    <OrderCustomer v-model="params.customer" get="id" />
    <q-btn label="Proceed" glossy color="primary" class="full-width" :to="{ name:'delivery_boy_order_items',params }" />
  </q-page>
</template>

<script>
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
export default {
  name: "PageDeliveryBoyOrderNew",
  components: {OrderCustomer, PriceListSelectDropDown},
  data() { return {
    params: { type:'Home Delivery',seating:null,customer:null,price_list:null,user:this.$route.meta.me.id },
  } },
  created(){
    if(!_.has(this.$store.state.public,'price_list')){
      let price_list = _.get(this.$store.getters[('prices/home_delivery')],'id',null)
      this.$store.commit('public',{ price_list })
    }
    this.params.price_list = this.$store.state.public.price_list;
  }
}
</script>
