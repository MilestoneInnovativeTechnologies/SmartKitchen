<template>
  <q-card>
    <CardImageTitle :image="src" :title="seat.name" />
    <q-card-actions><q-badge :label="token.id" class="q-py-sm q-px-sm" /><q-badge :label="token.progress" class="q-py-sm q-ml-sm" /><q-space /><q-btn v-if="token.progress !== 'Billed'" icon="add_box" color="primary" flat @click="add_mode = true" padding="0" /></q-card-actions>
    <OrderSummaryWaiterOrderItemsList :order="id" />
    <q-dialog v-model="add_mode" persistent v-if="token.progress !== 'Billed'"><OrderSummaryItemAdd :token="id" style="width: 700px; max-width: 90vw;" @close="add_mode = false" /></q-dialog>
  </q-card>
</template>

<script>
import OrderSummaryWaiterOrderItemsList from "components/Order/OrderSummaryWaiterOrderItemsList";
import OrderSummaryItemAdd from "components/Order/OrderSummaryItemAdd";
import CardImageTitle from "components/CardImageTitle";
export default {
  components: {CardImageTitle, OrderSummaryItemAdd, OrderSummaryWaiterOrderItemsList},
  data(){ return {
    src: 'img/defaults/seating.jpg',
    add_mode: false
  } },
  props: ['id'],
  name: "OrderSummaryWaiterOrder",
  computed: {
    token(){ return _.get(this.$store.state.tokens.data,_.toSafeInteger(this.id)) },
    seat(){ return _.get(this.$store.state.seating.data,_.toSafeInteger(this.token.seating)) }
  }
}
</script>
