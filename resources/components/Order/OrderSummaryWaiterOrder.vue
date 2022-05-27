<template>
  <q-card>
    <CardImageTitle :image="src" :title="seat.name" />
    <q-card-actions>
      <q-badge :label="token.id" class="q-py-sm q-px-sm" />
      <q-badge :label="token.progress" class="q-py-sm q-ml-sm" />
      <q-space />
      <div class="q-gutter-x-xs">
        <q-btn v-if="can_generate_bill && !bill" icon="receipt_long" color="secondary" size="sm" @click="bill_generate_mode = true" padding="xs" />
        <q-btn v-if="can_make_payment && can_pay" icon="payments" color="green-10" size="sm" @click="collect_payment_mode = true" padding="xs" />
        <q-btn v-if="can_update" icon="rule" color="warning" size="sm" @click="manage_mode = true" padding="xs" />
      </div>
    </q-card-actions>
    <OrderSummaryWaiterOrderItemsList :token="token" />
    <q-dialog v-model="bill_generate_mode" persistent><div :style="popup_width()"><TokenBillGenerate :token="token" :close="true" @generated="bill_generate_mode = false" /></div></q-dialog>
    <q-dialog v-model="collect_payment_mode" persistent><PaymentCollectCard :style="popup_width()" :bill="token.bill" @paid="collect_payment_mode = false" /></q-dialog>
    <q-dialog v-model="manage_mode" persistent><OrderSummaryItemsManage :token="token" :style="popup_width()" @close="manage_mode = false" @done="manage_mode = false" /></q-dialog>
  </q-card>
</template>

<script>
import OrderSummaryWaiterOrderItemsList from "components/Order/OrderSummaryWaiterOrderItemsList";
import CardImageTitle from "components/CardImageTitle";
import {image, popup_width, settings_boolean} from "assets/helpers";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import PaymentCollectCard from "components/Payment/PaymentCollectCard";
import OrderSummaryItemsManage from "components/Order/OrderSummaryItemsManage";
export default {
  components: {OrderSummaryItemsManage, PaymentCollectCard, TokenBillGenerate, CardImageTitle, OrderSummaryWaiterOrderItemsList},
  data(){ return {
    manage_mode: false, bill_generate_mode: false, collect_payment_mode: false,
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
    can_update(){
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
