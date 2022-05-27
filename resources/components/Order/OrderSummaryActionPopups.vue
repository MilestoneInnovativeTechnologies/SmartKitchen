<template>
  <div>
    <q-dialog :value="bill_generate" persistent @before-hide="done"><TokenBillGenerate :token="item" :style="popup_width()" :close="true" @generated="done" /></q-dialog>
    <q-dialog :value="collect_payment" persistent @before-hide="done"><PaymentCollectCard :style="popup_width()" :bill="bill" @paid="done" /></q-dialog>
    <q-dialog :value="customer_detail" persistent @before-hide="done"><CustomerDetailCard v-if="customer_id" :id="customer_id" style="max-width: 360px; width: 90vw;" color="purple" /></q-dialog>
    <q-dialog :value="token_items" persistent @before-hide="done"><OrderSummaryItemsManage :token="item" :style="popup_width()" @close="done" @done="done" /></q-dialog>
  </div>
</template>

<script>
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import {popup_width} from "assets/helpers";
import PaymentCollectCard from "components/Payment/PaymentCollectCard";
import CustomerDetailCard from "components/Customer/CustomerDetailCard";
import OrderSummaryItemsManage from "components/Order/OrderSummaryItemsManage";

export default {
  name: "OrderSummaryActionPopups",
  props: ['item','mode'],
  components: {OrderSummaryItemsManage, CustomerDetailCard, PaymentCollectCard, TokenBillGenerate},
  computed: {
    bill_generate(){ return this.mode === 'bill' },
    collect_payment(){ return this.mode === 'payment' },
    customer_detail(){ return this.mode === 'customer' },
    token_items(){ return this.mode === 'items' },

    bill(){ return _.get(this.item,'bill') },
    customer_id(){ return _.get(this.item,['customer','id']) },
  },
  methods: {
    popup_width,
    done(){ this.$emit('done') }
  }
}
</script>
