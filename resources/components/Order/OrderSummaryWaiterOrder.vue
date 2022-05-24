<template>
  <q-card>
    <CardImageTitle :image="src" :title="seat.name" />
    <q-card-actions>
      <q-badge :label="token.id" class="q-py-sm q-px-sm" />
      <q-badge :label="token.progress" class="q-py-sm q-ml-sm" />
      <q-space />
      <div>
        <q-btn v-if="can_generate_bill && !bill" icon="receipt_long" color="secondary" flat @click="bill_generate_mode = true" padding="0" />
        <q-btn v-if="can_make_payment && can_pay" icon="payments" color="green-10" flat @click="collect_payment_mode = true" padding="0" />
        <q-btn v-if="can_add" icon="add_box" color="primary" flat @click="add_mode = true" padding="0" />
      </div>
    </q-card-actions>
    <OrderSummaryWaiterOrderItemsList :token="token" />
    <q-dialog v-model="bill_generate_mode" persistent><div :style="popup_width()"><TokenBillGenerate :token="token" :close="true" @generated="bill_generate_mode = false" /></div></q-dialog>
    <q-dialog v-model="collect_payment_mode" persistent><PaymentCollectCard :style="popup_width()" :bill="token.bill" @paid="collect_payment_mode = false" /></q-dialog>
    <q-dialog v-model="add_mode" persistent v-if="token.progress !== 'Billed'"><OrderSummaryItemAdd :token="token.id" style="width: 700px; max-width: 90vw;" @close="add_mode = false" /></q-dialog>
  </q-card>
</template>

<script>
import OrderSummaryWaiterOrderItemsList from "components/Order/OrderSummaryWaiterOrderItemsList";
import OrderSummaryItemAdd from "components/Order/OrderSummaryItemAdd";
import CardImageTitle from "components/CardImageTitle";
import {image, popup_width, settings_boolean} from "assets/helpers";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import PaymentCollectCard from "components/Payment/PaymentCollectCard";
export default {
  components: {PaymentCollectCard, TokenBillGenerate, CardImageTitle, OrderSummaryItemAdd, OrderSummaryWaiterOrderItemsList},
  data(){ return {
    add_mode: false, bill_generate_mode: false, collect_payment_mode: false,
  } },
  props: ['token'],
  name: "OrderSummaryWaiterOrder",
  computed: {
    seat(){ return _.get(this.token,'seating') },
    src(){ return image(this.seat.image) },
    can_generate_bill(){ return settings_boolean(settings('waiter_generate_bills')) !== false },
    can_make_payment(){ return settings_boolean(settings('waiter_make_payments')) !== false },
    filter_progress(){ return _.concat(((settings_boolean(settings('waiter_generate_bills')) !== false) ? ['Completed'] : []),((settings_boolean(settings('waiter_make_payments')) !== false) ? ['Pending','Partial'] : [])) },
    bill(){ return _.get(this.token,'bill') },
    can_pay(){ return this.bill && _.get(this.bill,'progress') !== 'Paid' },
    can_add(){
      if(!this.bill) return true;
      if(settings_boolean(settings('enable_billed_dining_token_update')) === true) return true;
      if(settings_boolean(settings('enable_billed_dining_token_update')) === false) return false;
      return settings_boolean(settings('enable_billed_token_update')) === true
    },
  },
  methods: {
    popup_width,
  }
}
</script>
