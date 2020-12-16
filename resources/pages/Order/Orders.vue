<template>
  <q-page padding>
    <div class="row q-col-gutter-xs items-start">
      <div class="col-xs-6 col-sm-4 col-md-3 col-2" v-for="(token,id) in tokens" :key="hKey(token)">
        <OrderSummaryWaiterItem :id="id" />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn fab icon="add" color="primary" glossy :to="{ name: 'order_new' }" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import OrderSummaryWaiterItem from "components/Order/OrderSummaryWaiterOrder";
import {h_key} from "assets/helpers";
export default {
  name: 'PageOrders',
  components: {OrderSummaryWaiterItem},
  data(){ return {
    token: new URLSearchParams(document.location.search.substring(1)).get('token')
  } },
  computed: {
    tokens(){ return this.$store.getters['tokens/today'] }
  },
  methods: {
    hKey({ id }){ h_key('order','summary','order',id) }
  }
}
</script>
