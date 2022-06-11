<template>
  <q-card>
    <q-card-section class="q-py-xs text-center text-white" :class="cColor"><span v-if="token.type === 'Dining' && token.user">{{ token.user.name }}</span></q-card-section>
    <CardImageTitle :image="src" :title="token.seating ? token.seating.name : (token.customer ? token.customer.name : token.type)" :caption="token.customer ? (token.seating ? (token.customer.name + ', ' + token.customer.phone) : token.customer.phone) : null" :info="token.type === 'Home Delivery'" @info="$emit('action',['customer',token])" />
    <q-card-actions>
      <q-badge :label="token.id" class="q-pa-sm" />
      <q-badge :label="token.type" class="q-py-sm q-ml-xs" />
      <q-badge :label="token.progress" class="q-py-sm q-ml-xs" />
      <q-space />
      <div class="q-gutter-x-xs">
        <q-btn v-show="token_items_selected.length" :loading="TIS_loading" icon="how_to_reg" color="primary" size="sm" padding="xs" @click="serve_selected_token_items" />
        <q-btn v-if="!bill" icon="receipt_long" color="secondary" size="sm" @click="$emit('action',[token.type === 'Home Delivery' ? 'delivery_bill' : 'bill',token])" padding="xs" />
        <q-btn v-if="can_pay" icon="payments" color="positive" size="sm" @click="$emit('action',['payment',token])" padding="xs" />
        <q-btn v-if="can_update" icon="rule" color="warning" size="sm" @click="$emit('action',['items',token])" padding="xs" />
      </div>
    </q-card-actions>
    <OrderSummaryWaiterOrderItemsList :token="token" :noserve="noserve" @select="token_item_select" :selected="token_items_selected" />
  </q-card>
</template>

<script>
import OrderSummaryWaiterOrderItemsList from "components/Order/OrderSummaryWaiterOrderItemsList";
import CardImageTitle from "components/CardImageTitle";
import {images} from "assets/default_images";
import {DiningTypeColor} from "assets/assets";
import {image, popup_width, settings_boolean} from "assets/helpers";
import CustomerDetailCard from "components/Customer/CustomerDetailCard";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import PaymentCollectCard from "components/Payment/PaymentCollectCard";
import OrderSummaryItemsManage from "components/Order/OrderSummaryItemsManage";
import TokenItemSelect from "assets/mixins/TokenItemSelect";

export default {
  name: "OrderSummaryReceptionistOrder",
  components: {OrderSummaryItemsManage, PaymentCollectCard, TokenBillGenerate, CustomerDetailCard, CardImageTitle, OrderSummaryWaiterOrderItemsList},
  data(){ return {
    manage_mode: false, bill_generate_mode: false, info: false, collect_payment_mode: false,
  } },
  mixins: [TokenItemSelect],
  props: ['token','noserve'],
  computed: {
    image(){ let type = this.token.type; return type === 'Dining' ? this.token.seating.image : ((type === 'Home Delivery' && this.token.customer) ? this.token.customer.image : images[_.toLower(type).replace(/\s*/g,'')]) },
    src(){ return image(this.image) },
    cColor(){ return 'bg-' + DiningTypeColor[this.token.type] },
    bill(){ return _.get(this.token,'bill') },
    can_pay(){ return this.bill && _.get(this.bill,'progress') !== 'Paid' },
    can_update(){
      if(!this.bill) return true; let setting_key = _.snakeCase(`Enable Billed ${this.token.type} Token Update`);
      if(settings_boolean(settings(setting_key)) === true) return true;
      if(settings_boolean(settings(setting_key)) === false) return false;
      return settings_boolean(settings('enable_billed_token_update')) === true
    },
  },
  methods: {
    popup_width
  }
}
</script>
