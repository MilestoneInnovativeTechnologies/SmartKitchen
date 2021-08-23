<template>
  <q-page padding class="flex flex-center">
    <Masonry width="300" :items="tokens"><template #item="token"><OrderSummaryReceptionistOrder :id="token.id" :noserve="true" /></template></Masonry>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab || !tokens.length" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'delivery_boy_order_new' }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
import {mapState} from "vuex";
import {h_key} from "assets/helpers";
import {debounce} from "quasar";
import Masonry from "components/Masonry";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";

export default {
  name: "PageDeliveryBoyOrders",
  components: {OrderSummaryReceptionistOrder, Masonry},
  data(){ return {
    fab: true, offset: [24,24],
  } },
  computed: {
    ...mapState('tokens',{
      tokens({ data }){ return _(data).filter(['type','Home Delivery']).filter(({ user,progress }) => (!user || user === this.$route.meta.me.id) && progress !== 'Billed').value() },
    })
  },
  methods: {
    hKey({ id }){ h_key('order','summary','order',id) },
    scrolled: debounce(function(){this.fab = false},500,true),
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] }
  },

}
</script>
