<template>
  <q-page padding class="flex flex-center">
    <Masonry width="280" :items="tokens"><template #item="token"><OrderSummaryReceptionistOrder :id="token.id" :noserve="true" /></template></Masonry>
    <OrderNewFabDeliveryBoy />
  </q-page>
</template>

<script>
import {mapState} from "vuex";
import Masonry from "components/Masonry";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";
import OrderNewFabDeliveryBoy from "components/Order/OrderNewFabDeliveryBoy";

export default {
  name: "PageDeliveryBoyOrders",
  components: {OrderNewFabDeliveryBoy, OrderSummaryReceptionistOrder, Masonry},
  computed: {
    ...mapState('tokens',{
      tokens({ data }){ return _(data).filter(['type','Home Delivery']).filter(({ user,progress }) => (!user || user === this.$route.meta.me.id) && progress !== 'Billed').value() },
    })
  },
}
</script>
