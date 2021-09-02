<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="offset">
      <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <q-fab v-show="fab" icon="add" active-icon="add" color="primary" glossy @click="fab = false" v-touch-pan.prevent.mouse="move" />
      </transition>
    </q-page-sticky>
    <q-dialog persistent :value="!fab" @hide="fab = true" transition-show="flip-down" transition-hide="flip-up"><OrderNewBasic :style="popup_width()" type="Home Delivery" :price_list="price_list" :user="$route.meta.me.id" /></q-dialog>
  </div>
</template>

<script>
import {popup_width} from "assets/helpers";
import OrderCustomer from "components/Order/OrderCustomer";
import OrderNewBasic from "components/Order/OrderNewBasic";

export default {
  name: "OrderNewFabDeliveryBoy",
  components: {OrderNewBasic, OrderCustomer},
  data(){ return {
    fab: true, offset: [24,24], customer: null
  } },
  computed: {
    price_list(){
      if(!_.has(this.$store.state.public,'home_delivery_price_list')){
        let home_delivery_price_list = _.get(this.$store.getters['settings/settings'],'home_delivery_price_list')
        if(home_delivery_price_list) this.$store.commit('public',{ home_delivery_price_list })
        else {
          home_delivery_price_list = _.get(this.$store.getters[('prices/home_delivery')],'id',null)
          if(home_delivery_price_list) this.$store.commit('public',{ home_delivery_price_list })
        }
      }
      return _.get(this.$store.state.public,'home_delivery_price_list',undefined)
    }
  },
  methods: {
    popup_width,
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] },
  },
}
</script>
