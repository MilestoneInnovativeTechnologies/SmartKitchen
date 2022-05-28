<template>
  <q-page padding class="flex flex-center">
    <Masonry width="280" :items="Tokens">
      <template #item="token">
        <OrderSummaryReceptionistOrder :token="token" :noserve="true" @action="OSA_action" />
      </template>
    </Masonry>
    <OrderSummaryActionPopups @done="OSA_action_done" v-bind="OSA_CB" />
    <OrderNewFabDeliveryBoy />
  </q-page>
</template>

<script>
import Masonry from "components/Masonry";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";
import OrderNewFabDeliveryBoy from "components/Order/OrderNewFabDeliveryBoy";
import Bills from "assets/mixins/Bills";
import OrderSummaryActionPopups from "components/Order/OrderSummaryActionPopups";
import OrderSummaryActions from "assets/mixins/OrderSummaryActions";

export default {
  name: "PageDeliveryBoyOrders",
  components: {OrderSummaryActionPopups, OrderNewFabDeliveryBoy, OrderSummaryReceptionistOrder, Masonry},
  mixins: [Bills,OrderSummaryActions],
  computed: {
    Tokens(){ return _(this.tokens).filter(token => !['Cancelled','Paid'].includes(token.progress) && token.type === 'Home Delivery').filter(token => !token.user || token.user === this.$route.meta.me.id).map(token => Object.assign({},token,{ bill: _.get(this.token_bill,token.id) })).reverse().value() },
  },
}
</script>
