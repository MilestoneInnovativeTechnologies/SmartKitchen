<template>
  <q-card>
    <q-card-section class="q-py-xs text-center text-white" :class="cColor"><span v-if="token.type === 'Dining' && token.user">{{ token.user.name }}</span></q-card-section>
    <CardImageTitle :image="src" :title="token.seating ? token.seating.name : (token.customer ? token.customer.name : token.type)" :caption="token.customer ? (token.seating ? (token.customer.name + ', ' + token.customer.phone) : token.customer.phone) : null" :info="token.type === 'Home Delivery'" @info="info = !info" />
    <q-card-actions>
      <q-badge :label="token.id" class="q-pa-sm" />
      <q-badge :label="token.type" class="q-py-sm q-ml-xs" />
      <q-badge :label="token.progress" class="q-py-sm q-ml-xs" />
      <q-space />
      <div>
        <q-btn v-if="!bill" icon="receipt_long" color="secondary" flat @click="bill_generate_mode = true" padding="0" />
        <q-btn v-if="can_pay" icon="payments" color="green-10" flat @click="collect_payment_mode = true" padding="0" />
        <q-btn icon="add_box" color="primary" flat @click="add_mode = true" padding="0" />
      </div>
    </q-card-actions>
    <OrderSummaryWaiterOrderItemsList :order="token.id" :noserve="noserve" />
    <q-dialog v-model="add_mode" persistent v-if="token.progress !== 'Billed'">
      <OrderSummaryItemAdd :token="token.id" :style="popup_width()" @close="add_mode = false" />
    </q-dialog>
    <q-dialog v-model="bill_generate_mode" persistent v-if="!bill">
      <div :style="popup_width()">
        <div class="flex justify-end"><q-btn color="teal" text-color="white" icon="close" v-close-popup  /></div>
        <TokenBillGenerate :token="token" />
      </div>
    </q-dialog>
    <q-dialog v-model="collect_payment_mode" persistent v-if="can_pay">
      <PaymentCollectCard :style="popup_width()" :bill="token.bill" @paid="collect_payment_mode = false" />
    </q-dialog>
    <q-dialog v-model="info" persistent v-if="token.type === 'Home Delivery' && token.customer"><CustomerDetailCard :id="token.customer.id" style="max-width: 360px; width: 90vw;" color="purple" /></q-dialog>
  </q-card>
</template>

<script>
import OrderSummaryWaiterOrderItemsList from "components/Order/OrderSummaryWaiterOrderItemsList";
import OrderSummaryItemAdd from "components/Order/OrderSummaryItemAdd";
import CardImageTitle from "components/CardImageTitle";
import { mapState } from 'vuex'
import {images} from "assets/default_images";
import {DiningTypeColor} from "assets/assets";
import {image, popup_width} from "assets/helpers";
import CustomerDetailCard from "components/Customer/CustomerDetailCard";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import PaymentCollectCard from "components/Payment/PaymentCollectCard";

export default {
  components: {
    PaymentCollectCard,
    TokenBillGenerate, CustomerDetailCard, CardImageTitle, OrderSummaryItemAdd, OrderSummaryWaiterOrderItemsList},
  data(){ return {
    add_mode: false, bill_generate_mode: false, info: false, collect_payment_mode: false
  } },
  props: ['token','noserve'],
  name: "OrderSummaryReceptionistOrder",
  computed: {
    image(){ let type = this.token.type; return type === 'Dining' ? this.token.seating.image : ((type === 'Home Delivery' && this.token.customer) ? this.token.customer.image : images[_.toLower(type).replace(/\s*/g,'')]) },
    src(){ return image(this.image) },
    cColor(){ return 'bg-' + DiningTypeColor[this.token.type] },
    bill(){ return _.get(this.token,'bill') },
    can_pay(){ return this.bill && _.get(this.bill,'progress') !== 'Paid' },
  },
  methods: {
    popup_width
  }
}
</script>
